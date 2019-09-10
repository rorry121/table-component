import { ContentChildren, Directive, QueryList } from '@angular/core';
import { HzThComponent } from '../hz-th/hz-th.component';
import { HzTdDirective } from './hz-td.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'tr'
})
export class HzTrDirective {
  @ContentChildren(HzThComponent, {descendants: true}) listOfHzThComponent: QueryList<HzThComponent>;
  @ContentChildren(HzTdDirective, {descendants: true}) listOfHzTdDirective: QueryList<HzTdDirective>;
  constructor() { }

}
