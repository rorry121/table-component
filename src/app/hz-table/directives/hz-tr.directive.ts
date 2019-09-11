import { ContentChildren, Directive, QueryList } from '@angular/core';
import { HzTdDirective } from './hz-td.directive';
import { HzThDirective } from './hz-th.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'tr'
})
export class HzTrDirective {
  @ContentChildren(HzThDirective, {descendants: true}) listOfHzThDirective: QueryList<HzThDirective>;
  @ContentChildren(HzTdDirective, {descendants: true}) listOfHzTdDirective: QueryList<HzTdDirective>;
  constructor() { }

}
