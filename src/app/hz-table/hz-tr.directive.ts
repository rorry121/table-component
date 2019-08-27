import { ContentChildren, Directive, QueryList } from '@angular/core';
import { HzThComponent } from './hz-th/hz-th.component';
import { HzTdComponent } from './hz-td/hz-td.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'tr'
})
export class HzTrDirective {
  @ContentChildren(HzThComponent, {descendants: true}) listOfHzThComponent: QueryList<HzThComponent>;
  @ContentChildren(HzTdComponent, {descendants: true}) listOfHzTdComponent: QueryList<HzTdComponent>;
  constructor() { }

}
