import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from './ng-let.directive';

@NgModule({
  declarations: [NgLetDirective],
  imports: [CommonModule],
  exports: [NgLetDirective]
})
export class NgLetModule {}
