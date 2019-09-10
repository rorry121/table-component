import {
  AfterViewInit,
  Component,
  ElementRef,
  Host,
  HostBinding,
  Input, OnChanges,
  OnInit,
  Optional, SimpleChanges
} from '@angular/core';
import { HzTableComponent } from '../hz-table.component';

@Component({
  selector: 'th',
  templateUrl: './hz-th.component.html',
})
export class HzThComponent implements OnInit, AfterViewInit, OnChanges {

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

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.innerText = this.element.nativeElement.innerText;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('h:', changes, this.element.nativeElement.clientWidth);
  }

}
