import { Component, ElementRef, Host, HostBinding, Input, OnInit, Optional, Renderer2 } from '@angular/core';
import { HzTableComponent } from '../hz-table.component';
import { Subject } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'th',
  templateUrl: './hz-th.component.html',
})
export class HzThComponent implements OnInit {

  @Input() hzShowSort = false;
  @Input() hzSortKey: string;
  @Input() hzSort: 'asc' | 'desc' = 'asc';
  @Input() hzLeft: string;
  @Input() hzRight: string;
  sortChange$ = new Subject<{key: string, value: 'asc' | 'desc'}>();
  @HostBinding('class.hz-table-th') get isHzTb() {
    return this.hzTableComponent;
  }
  @HostBinding('class.hz-table-col-left-sticky') get isFixedLeft() {
    if (this.hzTableComponent && this.hzLeft) {
      this.renderer2.setStyle(this.element.nativeElement, 'left', this.hzLeft);
    }
    return this.hzLeft;
  }
  @HostBinding('class.hz-table-col-right-sticky') get isFixedRight() {
    if (this.hzTableComponent && this.hzRight) {
      this.renderer2.setStyle(this.element.nativeElement, 'right', this.hzRight);
    }
    return this.hzRight;
  }

  constructor(
    @Host() @Optional() public hzTableComponent: HzTableComponent,
    public element: ElementRef,
    private renderer2: Renderer2
  ) {
  }

  ngOnInit() {
  }

  sortChange() {
    if (this.hzSort === 'asc') {
      this.hzSort = 'desc';
    } else {
      this.hzSort = 'asc';
    }
    this.sortChange$.next({key: this.hzSortKey, value: this.hzSort});
  }

}
