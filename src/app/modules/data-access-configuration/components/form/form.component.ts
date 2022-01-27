import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { faBoxOpen, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ServicesName } from '../../../api/ng-openapi/models/services-name';
import { ConfigInfo } from '../../../api/ng-openapi/models/config-info';

@Component({
  selector: 'main-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  public boxIcon = faBoxOpen;
  public closeIcon = faWindowClose;
  public config: ConfigInfo | undefined;
  public firstStep = true;
  public secondStep = false;
  public energyStep = false;
  public title: string | undefined;
  public currentService: ServicesName | undefined;
  public energyForms: FormGroup[] | undefined;
  public energyModule = ServicesName.Energy;
  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const serviceName = String(routeParams.get('serviceName'));
    if (serviceName) {
      if (ServicesName.MirJournalService === serviceName) {
        this.currentService = ServicesName.MirJournalService;
        this.title = 'Мастер настройки службы журналирования';
      } else if (ServicesName.DaService === serviceName) {
        this.currentService = ServicesName.DaService;
        this.title = 'Мастер настройки службы доступа к данным';
      } else if (ServicesName.Energy === serviceName) {
        this.currentService = ServicesName.Energy;
        this.title = 'Мастер настройки Модуля ЭНЕРГИЯ';
      }
      this.cdr.detectChanges();
    }
  }
  public goSecondStep(dbConfg: ConfigInfo): void {
    this.config = dbConfg;
    this.firstStep = false;
    if (this.currentService !== ServicesName.Energy) {
      this.secondStep = true;
    } else {
      this.energyStep = true;
    }

    this.cdr.detectChanges();
  }

  public scadaConfirmForm(forms: FormGroup[]): void {
    this.energyStep = false;

    if (forms.length === 0) {
      this.firstStep = true;
    } else {
      this.energyForms = forms;
      this.secondStep = true;
    }
    this.cdr.detectChanges();
  }

  public secondStepBack(): void {
    this.secondStep = false;
    if (this.currentService === ServicesName.Energy) {
      this.energyStep = true;
    } else {
      this.firstStep = true;
    }
    this.cdr.detectChanges();
  }
}
