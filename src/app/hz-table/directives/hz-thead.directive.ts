import { ContentChildren, Directive, Host, Optional, QueryList } from '@angular/core';
import { HzTrDirective } from './hz-tr.directive';
import { HzTableComponent } from '../hz-table.component';
import { HzThDirective } from './hz-th.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'thead'
})
export class HzTheadDirective {

  @ContentChildren(HzThDirective, {descendants: true}) listOfHzThDirective: QueryList<HzThDirective>;
  @ContentChildren(HzTrDirective, {descendants: true}) listOfHzTrDirective: QueryList<HzTrDirective>;

  constructor(
    @Host() @Optional() public hzTableComponent: HzTableComponent,
  ) {
    if (this.hzTableComponent) {
      this.hzTableComponent.HzTheadDirective = this;
    }
  }

}
