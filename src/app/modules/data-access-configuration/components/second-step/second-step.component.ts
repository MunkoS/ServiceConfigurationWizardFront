import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { catchError, EMPTY, forkJoin, mergeMap, Observable, of, Subject, take, takeUntil, tap } from 'rxjs';
import { faCheck, faChevronDown, faChevronLeft, faChevronUp, faSyncAlt, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { sha512 } from 'js-sha512';
import { DbConfigService } from '../../../api/ng-openapi/services/db-config.service';
import { SqlService } from '../../../api/ng-openapi/services/sql.service';
import { OperationStatus, SecondStepInfo } from './model/second-step';
import { ServicesService } from '../../../api/ng-openapi/services/services.service';
import { ServicesName } from '../../../api/ng-openapi/models/services-name';
import { JournalConfigService } from '../../../api/ng-openapi/services/journal-config.service';
import { ConfigInfo } from '../../../api/ng-openapi/models/config-info';
import { DispatcherConfigService } from '../../../api/ng-openapi/services/dispatcher-config.service';
import { ScadaService } from '../../services/scada.service';

@Component({
  selector: 'second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondStepComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();

  @Input() public service: ServicesName | undefined;
  public loadingOperation = OperationStatus.loading;
  public errorOperation = OperationStatus.error;
  public successOperation = OperationStatus.success;
  public currentOperationName = 'Проверка подключения SQL';
  public operationsInfo!: SecondStepInfo;

  public iconUp = faChevronUp;
  public closeButtonIcon = faTimes;
  public closeButtonBack = faChevronLeft;
  public iconDown = faChevronDown;
  public iconLoad = faSyncAlt;
  public iconError = faTimesCircle;
  public iconSuccess = faCheck;
  @Input() public energyForms: FormGroup[] | undefined;
  @Input() public config: ConfigInfo | undefined;
  @Output() public readonly backStep = new EventEmitter();
  public progressBarValue = 0;
  public showCancelButton = true;
  constructor(
    private journalConfigService: JournalConfigService,
    private dbConfigService: DbConfigService,
    private dispatcherConfigService: DispatcherConfigService,
    private sqlService: SqlService,
    private servicesService: ServicesService,
    private cdr: ChangeDetectorRef,
    private scadaService: ScadaService
  ) {}

  private checkSqlConnections(): Observable<boolean> {
    return this.sqlService.checkSqlConnectionsPost$Json({
      body: {
        password: this.config?.password,
        dataSource: this.config?.hostName,
        userId: this.config?.userName
      }
    });
  }

  private saveConfig(): Observable<any> {
    let config = of(true);
    // eslint-disable-next-line default-case
    switch (this.service) {
      case ServicesName.DaService: {
        config = this.dbConfigService.dbConfigPatch$Json({
          body: {
            password: this.config?.password,
            hostName: this.config?.hostName,
            userName: this.config?.userName,
            dbName: this.config?.dbName
          }
        });
        break;
      }
      case ServicesName.MirJournalService: {
        config = this.journalConfigService.journalConfigPatch$Json({
          body: {
            password: this.config?.password,
            hostName: this.config?.hostName,
            userName: this.config?.userName,
            dbName: this.config?.dbName
          }
        });
        break;
      }
      case ServicesName.Energy: {
        config = this.dispatcherConfigService.dispatcherConfigPatch$Json({
          body: {
            password: this.config?.password,
            hostName: this.config?.hostName,
            userName: this.config?.userName,
            dbName: this.config?.dbName
          }
        });
        break;
      }
      default: {
        console.error('Не передан тип службы!');
        return EMPTY;
      }
    }

    return config.pipe(
      mergeMap(hasSaveConfig => {
        if (hasSaveConfig) {
          return this.servicesService
            .restartServiceGet$Json({
              service: this.service
            })
            .pipe(
              tap(restartErrorMessage => {
                if (restartErrorMessage.length !== 0) {
                  console.error(`Ошибка при перезапуске службы! ${restartErrorMessage}`);
                }
              })
            );
        }
        console.error('Ошибка при сохранении конфига!');
        return EMPTY;
      })
    );
  }

  private checkOperations(): void {
    this.checkSqlConnections()
      .pipe(
        mergeMap(isSuccessSqlConnection => {
          this.progressBarValue = 33;
          if (isSuccessSqlConnection) {
            this.operationsInfo.sql.operationStatus = OperationStatus.success;
            this.currentOperationName = 'Проверка наличия бд';
            this.cdr.detectChanges();
            return this.sqlService
              .checkDatabaseExistPost$Json({
                body: this.config
              })
              .pipe(
                mergeMap(isExistDb => {
                  if (isExistDb) {
                    this.operationsInfo.db.operationStatus = OperationStatus.success;
                    this.operationsInfo.db.message = 'База данных существует';
                    this.showCancelButton = false;
                    this.currentOperationName = `Доступность службы`;
                    this.progressBarValue = 66;
                    this.cdr.detectChanges();

                    return this.saveConfig().pipe(
                      mergeMap(() => {
                        if (this.service === ServicesName.Energy) {
                          return forkJoin([
                            this.servicesService.checkSericePost$Json({
                              hostName: 'localhost',
                              serviceName: ServicesName.Editor,
                              body: [5102]
                            }),
                            this.servicesService.checkSericePost$Json({
                              hostName: 'localhost',
                              serviceName: ServicesName.Dispatcher,
                              body: [5101]
                            })
                          ]).pipe(
                            tap(res => {
                              if (res.filter(x => x.length === 0).length === 2) {
                                this.currentOperationName = 'Все проверки выполнены: База данных существует';
                                this.operationsInfo.service.operationStatus = OperationStatus.success;
                                this.progressBarValue = 100;
                                this.showCancelButton = true;
                                this.cdr.detectChanges();
                              } else {
                                this.progressBarValue = 100;
                                this.operationsInfo.service.operationStatus = OperationStatus.error;
                                this.operationsInfo.service.message = `Editor error: ${res[0]} '\n'Dispatcher error: ${res[1]}`;
                                this.cdr.detectChanges();
                              }
                            })
                          );
                        }

                        const ports = this.service === ServicesName.MirJournalService ? [7082, 7083] : [7070, 4568];
                        return this.servicesService
                          .checkSericePost$Json({
                            hostName: 'localhost',
                            serviceName: this.service,
                            body: ports
                          })
                          .pipe(
                            tap(serviceErrorMessage => {
                              if (serviceErrorMessage.length === 0) {
                                this.currentOperationName = 'Все проверки выполнены: База данных существует';
                                this.operationsInfo.service.operationStatus = OperationStatus.success;
                                this.progressBarValue = 100;
                                this.showCancelButton = true;
                                this.cdr.detectChanges();
                              } else {
                                this.progressBarValue = 100;
                                this.operationsInfo.service.operationStatus = OperationStatus.error;
                                this.operationsInfo.service.message = serviceErrorMessage;
                                this.cdr.detectChanges();
                              }
                            })
                          );
                      })
                    );
                  }

                  this.currentOperationName = 'Создание базы данных!';
                  this.cdr.detectChanges();
                  return this.sqlService
                    .createNewDbPost$Json({
                      body: this.config
                    })
                    .pipe(
                      tap(dbCreateError => {
                        if (dbCreateError.length === 0) {
                          this.operationsInfo.db.operationStatus = OperationStatus.success;
                          this.cdr.detectChanges();
                          this.checkOperations();
                        } else {
                          this.operationsInfo.db.operationStatus = OperationStatus.error;
                          this.operationsInfo.db.message = dbCreateError;
                        }

                        this.cdr.detectChanges();
                      })
                    );
                })
              );
          }
          this.operationsInfo.sql.operationStatus = OperationStatus.error;
          this.operationsInfo.service.operationStatus = OperationStatus.error;
          this.operationsInfo.db.operationStatus = OperationStatus.error;
          this.cdr.detectChanges();
          return EMPTY;
        })
      )
      .pipe(
        catchError((err: string) => {
          this.operationsInfo.scada.operationStatus = OperationStatus.error;
          this.operationsInfo.scada.message = err;
          this.cdr.detectChanges();
          return EMPTY;
        }),
        take(1),
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this.cdr.detectChanges();
      });
  }

  public ngOnInit(): void {
    this.operationsInfo = {
      sql: {
        title: 'Проверка подключения Sql',
        iconOperation: faSyncAlt,
        operationStatus: OperationStatus.loading,
        message: '',
        showMessage: false,
        show: true
      },
      service: {
        title: `Подключение к службе`,
        iconOperation: faSyncAlt,
        operationStatus: OperationStatus.loading,
        message: '',
        showMessage: false,
        show: true
      },
      db: {
        title: 'Создание БД',
        iconOperation: faSyncAlt,
        operationStatus: OperationStatus.loading,
        message: '',
        showMessage: false,
        show: true
      },
      scada: {
        title: 'Создание учетной записи',
        iconOperation: faSyncAlt,
        operationStatus: OperationStatus.loading,
        message: '',
        showMessage: false,
        show: !!(this.energyForms && this.energyForms?.length > 0)
      }
    };
    this.currentOperationName = 'Проверка подключения к Sql';

    if (this.energyForms && this.energyForms?.length > 0) {
      const dispForm = this.energyForms[0];
      const graphForm = this.energyForms[1];

      forkJoin([
        this.scadaService.AddUsers({
          name: dispForm.get('login')?.value,
          groupsIds: [dispForm.get('groupId')?.value],
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          passwordHash: sha512(dispForm.get('password')?.value)
        }),
        this.scadaService.AddUsers({
          name: graphForm.get('login')?.value,
          groupsIds: [graphForm.get('groupId')?.value],
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          passwordHash: sha512(graphForm.get('password')?.value)
        })
      ])
        .pipe(
          catchError((err: any) => {
            this.operationsInfo.scada.operationStatus = OperationStatus.error;
            this.operationsInfo.scada.message = err.error;
            this.cdr.detectChanges();
            return EMPTY;
          }),
          take(1),
          takeUntil(this._destroy$)
        )
        .subscribe(() => {
          this.operationsInfo.scada.operationStatus = OperationStatus.success;

          this.cdr.detectChanges();
        });
    }
    this.checkOperations();
    this.cdr.detectChanges();
  }
  public back(): void {
    this.backStep.emit();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }
}
