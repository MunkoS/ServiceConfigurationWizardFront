import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DbConfigService } from '../../../api/ng-openapi/services/db-config.service';
import { SqlService } from '../../../api/ng-openapi/services/sql.service';
import { DbConfig } from '../../../api/ng-openapi/models/db-config';

@Component({
  selector: 'second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondStepComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();
  @Input() public dbConfig: DbConfig | undefined;
  constructor(private dbConfigService: DbConfigService, private sqlService: SqlService, private cdr: ChangeDetectorRef) {}

  private checkSqlConnections(): Observable<boolean> {
    return this.sqlService.getSqlConnectionsPost$Json({
      body: {
        password: this.dbConfig?.password,
        dataSource: this.dbConfig?.hostName,
        userId: this.dbConfig?.userName
      }
    });
  }

  private saveConfig(): void {
    this.dbConfigService
      .dbConfigPatch$Json({
        body: {
          password: this.dbConfig?.password,
          hostName: this.dbConfig?.hostName,
          userName: this.dbConfig?.userName,
          dbName: this.dbConfig?.dbName
        }
      })
      .pipe(takeUntil(this._destroy$))
      .subscribe();
  }

  public ngOnInit(): void {
    //  this.saveConfig();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }
}
