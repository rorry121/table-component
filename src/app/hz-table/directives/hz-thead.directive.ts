import { ContentChildren, Directive, Host, Optional, QueryList } from '@angular/core';
import { HzThComponent } from '../hz-th/hz-th.component';
import { HzTrDirective } from './hz-tr.directive';
import { Subject } from 'rxjs';
import { HzTableComponent } from '../hz-table.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'thead'
})
export class HzTheadDirective {

  @ContentChildren(HzThComponent, {descendants: true}) listOfHzThComponent: QueryList<HzThComponent>;
  @ContentChildren(HzTrDirective, {descendants: true}) listOfHzTrDirective: QueryList<HzTrDirective>;
  destroy$ = new Subject();

  constructor(
    @Host() @Optional() public hzTableComponent: HzTableComponent,
  ) {
    if (this.hzTableComponent) {
      this.hzTableComponent.HzTheadDirective = this;
    }
  }

}
