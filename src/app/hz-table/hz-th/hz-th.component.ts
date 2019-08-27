import { Component, ElementRef, Host, HostBinding, OnInit, Optional } from '@angular/core';
import { HzTableComponent } from '../hz-table.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'th',
  templateUrl: './hz-th.component.html',
  styleUrls: ['./hz-th.component.less'],
})
export class HzThComponent implements OnInit {

  // @HostBinding('class.hz-table-th') get isHzTb() {
  //   return this.hzTableComponent;
  // }

  constructor(
    @Host() @Optional() public hzTableComponent: HzTableComponent,
    public element: ElementRef,
  ) {
  }

  ngOnInit() {
  }

}
