import { Component, ElementRef, Host, HostBinding, Input, OnInit, Optional, Renderer2 } from '@angular/core';
import { HzTableComponent } from '../hz-table.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'td',
  templateUrl: './hz-td.component.html',
})
export class HzTdComponent implements OnInit {
  @Input() hzLeft: string;  // 固定列，左边距离
  @Input() hzRight: string; // 固定列，右边距离
  @Input() hzWidth: string;
  @Input() hzMinWidth: string;
  @Input() hzMaxWidth: string;

  @HostBinding('class.hz-table-td') get isHzTb() {
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

  @HostBinding('style.width') get setWidth() {
    return this.hzWidth;
  }

  @HostBinding('style.min-width') get setMinWidth() {
    return this.hzMinWidth;
  }

  @HostBinding('style.max-width') get setMaxWidth() {
    return this.hzMaxWidth;
  }

  constructor(
    @Host() @Optional() public hzTableComponent: HzTableComponent,
    public element: ElementRef,
    private renderer2: Renderer2
  ) {
  }

  ngOnInit() {
  }

}
