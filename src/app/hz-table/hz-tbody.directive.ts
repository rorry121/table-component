import { ContentChildren, Directive, Host, HostBinding, Optional, QueryList } from '@angular/core';
import { HzTableComponent } from './hz-table.component';
import { HzTrDirective } from './hz-tr.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'tbody'
})
export class HzTbodyDirective {
  @ContentChildren(HzTrDirective, {descendants: true}) listOfHzTrDirective: QueryList<HzTrDirective>;

  constructor(
    @Host() @Optional() public hzTableComponent: HzTableComponent,
  ) {
    if (this.hzTableComponent) {
      this.hzTableComponent.hzTbodyDirective = this;
    }
  }

  @HostBinding('class.hz-table-tbody') get isHzTb() {
    return this.hzTableComponent;
  }
}
