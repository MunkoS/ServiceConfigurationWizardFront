import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { DataAccessConfigurationModuleRoutingModule } from './data-access-configuration-routing.module';
import { FirstStepComponent } from './components/first-step/first-step.component';
import { SelectModule } from '../shared/select/select.module';
import {NgLetModule} from "../shared/ng-let/ng-let.module";

@NgModule({
  declarations: [MainComponent, FirstStepComponent],
  imports: [CommonModule, DataAccessConfigurationModuleRoutingModule, FontAwesomeModule, ReactiveFormsModule, SelectModule, NgLetModule]
})
export class DataAccessConfigurationModule {}
