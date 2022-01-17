import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LetContext } from './let-context';

@Directive({
  selector: '[ngLet]'
})
export class NgLetDirective<T> {
  @Input() public ngLet: T | undefined;

  constructor(@Inject(ViewContainerRef) viewContainer: ViewContainerRef, @Inject(TemplateRef) templateRef: TemplateRef<LetContext<T>>) {
    viewContainer.createEmbeddedView(templateRef, new LetContext<T>(this));
  }
}
