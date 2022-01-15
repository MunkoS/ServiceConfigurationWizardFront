import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './components/main/main.component';
import { DataAccessConfigurationModuleRoutingModule } from './data-access-configuration-routing.module';
import { FirstStepComponent } from './components/first-step/first-step.component';

@NgModule({
  declarations: [MainComponent, FirstStepComponent],
  imports: [CommonModule, DataAccessConfigurationModuleRoutingModule, FontAwesomeModule]
})
export class DataAccessConfigurationModule {}
