import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { faTimes, faCheck, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, debounceTime, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { DbConfigService } from '../../../api/ng-openapi/services/db-config.service';
import { SelectModel } from '../../../shared/select/models/select';
import { SqlService } from '../../../api/ng-openapi/services/sql.service';
import { DbConfig } from '../../../api/ng-openapi/models/db-config';

@Component({
  selector: 'first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStepComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();
  private _bdNames: string[] | undefined;
  @Output() public readonly secondStep = new EventEmitter<DbConfig>();
  public iconLoad = faSyncAlt;
  public formChange = false;

  public sqlConnectionCheck = false;
  public createNewBd = false;

  public closeButtonIcon = faTimes;
  public checkButtonIcon = faCheck;
  public bdLoading = false;

  public form: FormGroup = new FormGroup({
    security: new FormGroup({
      dataSource: new FormControl('localhost', Validators.required),
      login: new FormControl('prgacc', Validators.required),
      password: new FormControl('account', Validators.required)
    }),
    // eslint-disable-next-line @typescript-eslint/unbound-method
    dbName: new FormControl('', [Validators.required, this.noWhitespaceValidator])
  });
  public securityGroup = (this.form.get('security') as FormGroup).controls;
  public bdOptions$: Observable<SelectModel[]> | undefined;
  public sqlError = false;

  constructor(private dbConfigService: DbConfigService, private sqlService: SqlService, private cdr: ChangeDetectorRef) {}

  private noWhitespaceValidator(control: FormControl) {
    if (control.value) {
      const isWhitespace = control.value.split(' ').length > 1;
      const isValid = !isWhitespace;
      return isValid ? null : { isWhitespace: true };
    }

    return null;
  }

  private disableFields(): void {
    this.securityGroup.dataSource?.disable({
      emitEvent: false
    });
    this.securityGroup?.login?.disable({
      emitEvent: false
    });
    this.securityGroup?.password?.disable({
      emitEvent: false
    });
    this.form?.get('dbName')?.disable({
      emitEvent: false
    });
  }

  private enableFields(): void {
    this.securityGroup.dataSource?.enable({
      emitEvent: false
    });
    this.securityGroup?.login?.enable({
      emitEvent: false
    });
    this.securityGroup?.password?.enable({
      emitEvent: false
    });
    this.form?.get('dbName')?.enable({
      emitEvent: false
    });
  }

  private checkSqlConnections(): Observable<boolean> {
    if (!this.securityGroup?.dataSource?.value || !this.securityGroup?.password?.value || !this.securityGroup?.login?.value) {
      this.sqlError = true;
      this.sqlConnectionCheck = false;
      this.enableFields();
      this.cdr.detectChanges();
      return of(false);
    }
    this.sqlConnectionCheck = true;
    this.disableFields();
    this.cdr.detectChanges();
    return this.sqlService
      .checkSqlConnectionsPost$Json({
        body: {
          password: this.securityGroup?.password?.value,
          dataSource: this.securityGroup?.dataSource?.value,
          userId: this.securityGroup?.login?.value
        }
      })
      .pipe(
        takeUntil(this._destroy$),
        tap(isError => {
          this.sqlError = !isError;
          this.sqlConnectionCheck = false;
          this.enableFields();
          this.cdr.detectChanges();
        }),
        catchError(() => {
          this.sqlError = true;
          this.sqlConnectionCheck = false;
          this.enableFields();
          this.cdr.detectChanges();
          return of(false);
        })
      );
  }

  public ngOnInit(): void {
    this.disableFields();
    this.form
      .get('dbName')
      ?.valueChanges.pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        if (res) {
          this.createNewBd = !this._bdNames?.find(x => x === res);
        } else {
          this.createNewBd = false;
        }
      });

    this.form
      .get('security')
      ?.valueChanges.pipe(
        debounceTime(300),
        switchMap(() => {
          this.formChange = true;
          this.downloadBdOptions();
          return this.checkSqlConnections();
        }),
        takeUntil(this._destroy$)
      )

      .subscribe();

    this.dbConfigService
      .dbConfigGet$Json()
      .pipe(
        take(1),
        takeUntil(this._destroy$),
        switchMap(res => {
          if (res) {
            this.securityGroup?.dataSource?.setValue(res.hostName, {
              emitEvent: false
            });
            this.securityGroup?.login?.setValue(res.userName, {
              emitEvent: false
            });
            this.securityGroup?.password?.setValue(res.password, {
              emitEvent: false
            });
            this.form?.get('dbName')?.setValue(res.dbName, {
              emitEvent: false
            });
          }
          this.downloadBdOptions();
          return this.checkSqlConnections();
        }),
        catchError(() => {
          this.sqlError = true;
          this.sqlConnectionCheck = false;
          this.enableFields();
          this.cdr.detectChanges();
          return of(false);
        })
      )
      .subscribe();
  }

  public downloadBdOptions(): void {
    if (this.formChange) {
      return;
    }
    this.formChange = false;
    this.bdLoading = true;
    this.sqlError = false;
    this.bdOptions$ = this.sqlService
      .getDatabasesPost$Json({
        body: {
          password: this.securityGroup?.password?.value,
          dataSource: this.securityGroup?.dataSource?.value,
          userId: this.securityGroup?.login?.value
        }
      })
      .pipe(
        map(res => {
          this.bdLoading = false;
          this._bdNames = res.map(x => x.title ?? '');
          this.createNewBd = !this._bdNames?.find(x => x === this.form?.get('dbName')?.value);
          this.cdr.detectChanges();

          return res.map(x => {
            const res: SelectModel = {
              title: x.title ?? '',
              value: x.value ?? ''
            };
            return res;
          });
        }),
        catchError(() => {
          this.bdLoading = false;
          this.sqlError = true;

          return of([]);
        })
      );
  }

  public next(): void {
    this.secondStep.emit({
      password: this.securityGroup?.password?.value,
      hostName: this.securityGroup?.dataSource?.value,
      dbName: this.form.get('dbName')?.value,
      userName: this.securityGroup?.login?.value
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }
}
