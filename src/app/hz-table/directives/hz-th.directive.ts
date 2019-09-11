import { AfterViewInit, Directive, ElementRef, Host, HostBinding, Input, Optional } from '@angular/core';
import { HzTableComponent } from '../hz-table.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'th'
})
export class HzThDirective implements AfterViewInit {

  @Input() hzShowSort = false;
  @Input() sortActive = false;
  @Input() hzSortKey: string;
  @Input() hzSort: 'asc' | 'desc' = 'asc';
  @Input() hzLeft: string;
  @Input() hzRight: string;
  @Input() innerText: string;
  hzWidth: string;

  @HostBinding('class.hz-table-th') get isHzTb() {
    return this.hzTableComponent;
  }

  constructor(
    @Host() @Optional() public hzTableComponent: HzTableComponent,
    public element: ElementRef,
  ) {
  }

  ngAfterViewInit(): void {
    this.innerText = this.element.nativeElement.innerText;
  }

}
