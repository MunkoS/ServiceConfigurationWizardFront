import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EMPTY, mergeMap, Observable, Subject, take, takeUntil } from 'rxjs';
import { faCheck, faChevronDown, faChevronLeft, faChevronUp, faSyncAlt, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { DbConfigService } from '../../../api/ng-openapi/services/db-config.service';
import { SqlService } from '../../../api/ng-openapi/services/sql.service';
import { DbConfig } from '../../../api/ng-openapi/models/db-config';
import { OperationStatus, SecondStepInfo } from './model/second-step';
import { DasServicesService } from '../../../api/ng-openapi/services/das-services.service';

@Component({
  selector: 'second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondStepComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();
  public loadingOperation = OperationStatus.loading;
  public errorOperation = OperationStatus.error;
  public successOperation = OperationStatus.success;
  public currentOperationName = '';
  public operationsInfo: SecondStepInfo = {
    sql: {
      title: 'Проверка подключения Sql',
      iconOperation: faSyncAlt,
      operationStatus: OperationStatus.loading,
      message: '',
      showMessage: false
    },
    das: {
      title: 'Подключение DAS',
      iconOperation: faSyncAlt,
      operationStatus: OperationStatus.loading,
      message: '',
      showMessage: false
    },
    db: {
      title: 'Создание БД',
      iconOperation: faSyncAlt,
      operationStatus: OperationStatus.loading,
      message: 'ntcn',
      showMessage: false
    }
  };

  public iconUp = faChevronUp;
  public closeButtonIcon = faTimes;
  public closeButtonBack = faChevronLeft;
  public iconDown = faChevronDown;
  public iconLoad = faSyncAlt;
  public iconError = faTimesCircle;
  public iconSuccess = faCheck;
  @Input() public dbConfig: DbConfig | undefined;
  @Output() public readonly firstStep = new EventEmitter();
  public progressBarValue = 0;
  public showCancelButton = true;
  constructor(
    private dbConfigService: DbConfigService,
    private sqlService: SqlService,
    private dasService: DasServicesService,
    private cdr: ChangeDetectorRef
  ) {}

  private checkSqlConnections(): Observable<boolean> {
    return this.sqlService.checkSqlConnectionsPost$Json({
      body: {
        password: this.dbConfig?.password,
        dataSource: this.dbConfig?.hostName,
        userId: this.dbConfig?.userName
      }
    });
  }

  private saveConfig(): Observable<any> {
    return this.dbConfigService
      .dbConfigPatch$Json({
        body: {
          password: this.dbConfig?.password,
          hostName: this.dbConfig?.hostName,
          userName: this.dbConfig?.userName,
          dbName: this.dbConfig?.dbName
        }
      })
      .pipe(
        mergeMap(hasSaveDbConfig => {
          if (hasSaveDbConfig) {
            return this.dasService.restartDasServiceGet$Json().pipe(
              mergeMap(restartErrorMessage => {
                if (restartErrorMessage.length !== 0) {
                  console.error(`Ошибка при перезапуске службы дас!${restartErrorMessage}`);
                }
                return EMPTY;
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
            this.operationsInfo.sql.message = OperationStatus.success;
            this.currentOperationName = 'Проверка наличия бд';
            this.cdr.detectChanges();
            return this.sqlService
              .checkDatabaseExistPost$Json({
                body: this.dbConfig
              })
              .pipe(
                mergeMap(isExistDb => {
                  if (isExistDb) {
                    this.progressBarValue = 100;
                    this.operationsInfo.db.operationStatus = OperationStatus.success;
                    this.operationsInfo.das.operationStatus = OperationStatus.success;
                    this.operationsInfo.db.message = 'База данных существует';
                    this.currentOperationName = 'Все проверки выполнены: База данных существует';
                    this.showCancelButton = false;
                    this.cdr.detectChanges();
                    return this.saveConfig();
                  }
                  this.currentOperationName = 'Доступность службы DAService';
                  this.progressBarValue = 66;
                  this.cdr.detectChanges();
                  return this.dasService.checkDasSericeGet$Json().pipe(
                    mergeMap(dasErrorMessage => {
                      if (dasErrorMessage.length === 0) {
                        this.currentOperationName = 'Все проверки выполнены';
                        this.operationsInfo.das.operationStatus = OperationStatus.success;
                        this.operationsInfo.das.message = OperationStatus.success;
                        this.progressBarValue = 100;
                        this.showCancelButton = true;
                        this.cdr.detectChanges();
                        return this.sqlService
                          .createNewDbPost$Json({
                            body: this.dbConfig
                          })
                          .pipe(
                            mergeMap(dbCreateError => {
                              if (dbCreateError.length === 0) {
                                this.operationsInfo.db.operationStatus = OperationStatus.success;
                                this.operationsInfo.db.message = OperationStatus.success;
                                this.cdr.detectChanges();
                                this.checkOperations();
                                return EMPTY;
                              }
                              this.operationsInfo.db.operationStatus = OperationStatus.error;
                              this.operationsInfo.db.message = dbCreateError;
                              this.cdr.detectChanges();
                              return EMPTY;
                            })
                          );
                      }
                      this.operationsInfo.das.operationStatus = OperationStatus.error;
                      this.operationsInfo.das.message = dasErrorMessage;
                      this.operationsInfo.db.operationStatus = OperationStatus.error;
                      this.operationsInfo.db.message = dasErrorMessage;
                      this.cdr.detectChanges();
                      return EMPTY;
                    })
                  );
                })
              );
          }
          this.operationsInfo.sql.operationStatus = OperationStatus.error;
          this.operationsInfo.sql.message = OperationStatus.error;
          this.cdr.detectChanges();
          return EMPTY;
        })
      )
      .pipe(take(1), takeUntil(this._destroy$))
      .subscribe(() => {
        this.cdr.detectChanges();
      });
  }

  public ngOnInit(): void {
    this.currentOperationName = 'Проверка подключения к Sql';
    this.checkOperations();
    this.cdr.detectChanges();
  }
  public back(): void {
    this.firstStep.emit();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }
}
