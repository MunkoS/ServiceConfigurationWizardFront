import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { faBoxOpen, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { DbConfig } from '../../../api/ng-openapi/models/db-config';

@Component({
  selector: 'main-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  public boxIcon = faBoxOpen;
  public closeIcon = faWindowClose;
  public dbConfig: DbConfig | undefined;
  public secondStep = false;
  constructor(private cdr: ChangeDetectorRef) {}
  public goSecondStep(dbConfg: DbConfig): void {
    this.dbConfig = dbConfg;
    this.secondStep = true;
    this.cdr.detectChanges();
  }
}
