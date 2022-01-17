import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { faBoxOpen, faWindowClose, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, debounceTime, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { DbConfigService } from '../../../api/ng-openapi/services/db-config.service';
import { SelectModel } from '../../../shared/select/models/select';
import { SqlService } from '../../../api/ng-openapi/services/sql.service';

@Component({
  selector: 'first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStepComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();
  private _bdNames: string[] | undefined;
  public formChange = false;
  public boxIcon = faBoxOpen;
  public sqlConnectionCheck = true;
  public createNewBd = false;
  public isClosedSelect = true;
  public closeIcon = faWindowClose;
  public closeButtonIcon = faTimes;
  public checkButtonIcon = faCheck;
  public bdLoading = false;

  public form: FormGroup = new FormGroup({
    security: new FormGroup({
      dataSource: new FormControl('(localdb)\\MSSQLLocalDB', Validators.required),
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
    this.sqlConnectionCheck = true;
    this.disableFields();
    return this.sqlService
      .getSqlConnectionsPost$Json({
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
            this.securityGroup?.dataSource?.setValue(res.hostName);
            this.securityGroup?.login?.setValue(res.userName);
            this.securityGroup?.password?.setValue(res.password);
            this.form?.get('dbName')?.setValue(res.dbName);
          }
          return this.checkSqlConnections();
        })
      )
      .subscribe();
  }

  public downloadBdOptions(): void {
    if (!this.isClosedSelect || (!this.formChange && this._bdNames?.length)) {
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

  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  public next(): void {
    this.dbConfigService
      .dbConfigPatch$Json({
        body: {
          password: this.securityGroup?.password?.value,
          dataSource: this.securityGroup?.dataSource?.value,
          userId: this.securityGroup?.login?.value
        }
      })
      .pipe(takeUntil(this._destroy$))
      .subscribe();
  }
}
