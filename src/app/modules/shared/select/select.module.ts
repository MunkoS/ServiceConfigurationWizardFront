import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectComponent } from './components/select/select.component';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, LoaderModule, FormsModule, MatAutocompleteModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [SelectComponent]
})
export class SelectModule {}
