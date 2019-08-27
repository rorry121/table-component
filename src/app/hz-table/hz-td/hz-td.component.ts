import { Component, ElementRef, Host, HostBinding, Input, OnInit, Optional } from '@angular/core';
import { HzTableComponent } from '../hz-table.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'td',
  templateUrl: './hz-td.component.html',
  styleUrls: ['./hz-td.component.less'],
})
export class HzTdComponent implements OnInit {
  // @HostBinding('class.hz-table-td') get isHzTb() {
  //   return this.hzTableComponent;
  // }
  constructor(
    @Host() @Optional() public hzTableComponent: HzTableComponent,
    public element: ElementRef
  ) { }

  ngOnInit() {
  }

}
