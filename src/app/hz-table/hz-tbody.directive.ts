import { ContentChildren, Directive, Host, HostBinding, Optional, QueryList } from '@angular/core';
import { HzTrComponent } from './hz-tr/hz-tr.component';
import { HzTableComponent } from './hz-table.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'tbody'
})
export class HzTbodyDirective {
  @ContentChildren(HzTrComponent, {descendants: true}) listOfHzTrComponent: QueryList<HzTrComponent>;

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
