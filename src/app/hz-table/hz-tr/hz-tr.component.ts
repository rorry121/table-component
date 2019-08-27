import { Component, ContentChildren, Host, HostBinding, OnInit, Optional, QueryList } from '@angular/core';
import { HzTableComponent } from '../hz-table.component';
import { HzThComponent } from '../hz-th/hz-th.component';
import { HzTdComponent } from '../hz-td/hz-td.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tr',
  templateUrl: './hz-tr.component.html',
  styleUrls: ['./hz-tr.component.less']
})
export class HzTrComponent implements OnInit {
  @ContentChildren(HzThComponent, {descendants: true}) listOfHzThComponent: QueryList<HzThComponent>;
  @ContentChildren(HzTdComponent, {descendants: true}) listOfHzTdComponent: QueryList<HzTdComponent>;

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
