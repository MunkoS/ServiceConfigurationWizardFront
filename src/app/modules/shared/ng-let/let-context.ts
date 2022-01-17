import { NgLetDirective } from './ng-let.directive';

export class LetContext<T> {
  constructor(private readonly dir: NgLetDirective<T>) {}

  public get ngLet(): T | undefined {
    return this.dir.ngLet;
  }
}
