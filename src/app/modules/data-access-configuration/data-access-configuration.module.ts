import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MainComponent } from './components/main/main.component';
import { DataAccessConfigurationModuleRoutingModule } from './data-access-configuration-routing.module';
import { FirstStepComponent } from './components/first-step/first-step.component';
import { SelectModule } from '../shared/select/select.module';
import { NgLetModule } from '../shared/ng-let/ng-let.module';
import { FormComponent } from './components/form/form.component';
import { SecondStepComponent } from './components/second-step/second-step.component';
import { ScadaAccountSettingsComponent } from './components/scada-account-settings/scada-account-settings.component';

@NgModule({
  declarations: [MainComponent, FirstStepComponent, FormComponent, SecondStepComponent, ScadaAccountSettingsComponent],
  imports: [
    CommonModule,
    DataAccessConfigurationModuleRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SelectModule,
    NgLetModule,
    MatProgressBarModule,
    MatFormFieldModule
  ]
})
export class DataAccessConfigurationModule {}
