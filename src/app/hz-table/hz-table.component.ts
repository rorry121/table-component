import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter, OnDestroy,
  OnInit, Output, Renderer2,
  ViewChild
} from '@angular/core';
import { startWith, takeUntil, throttleTime } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { merge } from 'rxjs/internal/observable/merge';
import { HzTbodyDirective } from './directives/hz-tbody.directive';
import { HzTheadDirective } from './directives/hz-thead.directive';
import { HzThDirective } from './directives/hz-th.directive';

@Component({
  selector: 'app-hz-table',
  templateUrl: './hz-table.component.html',
  styleUrls: ['./hz-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HzTableComponent implements OnInit, AfterViewInit, OnDestroy {
  HzTheadDirective: HzTheadDirective;
  hzThComponent: HzThDirective[];
  hzTbodyDirective: HzTbodyDirective;
  destroy$ = new Subject();
  @Output() sortKeyChange = new EventEmitter<{ key: string, value: 'asc' | 'desc' }>();
  @ViewChild('tbodyScrollElement', {static: false}) tbodyScrollElement: ElementRef;
  @ViewChild('theadElement', {static: false}) theadElement: ElementRef;
  @ViewChild('tableElement', {static: false}) tableElement: ElementRef;
  @ViewChild('theadElementWrap', {static: false}) theadElementWrap: ElementRef;

  constructor(
    private renderer2: Renderer2,
    private cdf: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const resize$ = fromEvent(window, 'resize').pipe(
      throttleTime(20)
    );
    const scroll$ = fromEvent(this.tbodyScrollElement.nativeElement, 'scroll');

    const elementChange$ = merge(resize$, scroll$);
    elementChange$.pipe(
      startWith(true),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.renderer2.setStyle(this.theadElement.nativeElement, 'left', -this.tbodyScrollElement.nativeElement.scrollLeft + 'px');
      if (this.tbodyScrollElement.nativeElement.scrollWidth > this.tbodyScrollElement.nativeElement.clientWidth) {
        if (this.tbodyScrollElement.nativeElement.scrollLeft === 0) {
          this.renderer2.removeClass(this.tableElement.nativeElement, 'hz-table-scroll-middle');
          this.renderer2.removeClass(this.tableElement.nativeElement, 'hz-table-scroll-right');
          this.renderer2.addClass(this.tableElement.nativeElement, 'hz-table-scroll-left');
        } else if (this.tbodyScrollElement.nativeElement.scrollLeft === (this.tbodyScrollElement.nativeElement.scrollWidth - this.tbodyScrollElement.nativeElement.clientWidth)) {
          this.renderer2.removeClass(this.tableElement.nativeElement, 'hz-table-scroll-middle');
          this.renderer2.removeClass(this.tableElement.nativeElement, 'hz-table-scroll-left');
          this.renderer2.addClass(this.tableElement.nativeElement, 'hz-table-scroll-right');
        } else {
          this.renderer2.removeClass(this.tableElement.nativeElement, 'hz-table-scroll-left');
          this.renderer2.removeClass(this.tableElement.nativeElement, 'hz-table-scroll-right');
          this.renderer2.addClass(this.tableElement.nativeElement, 'hz-table-scroll-middle');
        }
      } else {
        this.renderer2.addClass(this.tableElement.nativeElement, 'hz-table-scroll-left');
        this.renderer2.addClass(this.tableElement.nativeElement, 'hz-table-scroll-right');
      }
    });

    const mergeChanges$ = merge(this.hzTbodyDirective.listOfHzTrDirective.changes, this.HzTheadDirective.listOfHzThDirective.changes, resize$);
    mergeChanges$.pipe(
      startWith(true),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      setTimeout(() => {
        if (this.HzTheadDirective.listOfHzThDirective.length > 0) {
          const width = this.tbodyScrollElement.nativeElement.offsetWidth - this.tbodyScrollElement.nativeElement.clientWidth;
          this.renderer2.setStyle(this.theadElementWrap.nativeElement, 'border-right-width', width + 'px');
          this.hzThComponent = this.HzTheadDirective.listOfHzThDirective.toArray();
          this.HzTheadDirective.listOfHzThDirective.forEach((e, i) => {
            this.hzThComponent[i].hzWidth = e.element.nativeElement.clientWidth + 'px';
          });
          this.cdf.detectChanges();
        }
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sortChange(th: HzThDirective) {
    if (th.hzSort === 'asc') {
      th.hzSort = 'desc';
    } else {
      th.hzSort = 'asc';
    }
    this.sortKeyChange.emit({key: th.hzSortKey, value: th.hzSort});
  }
}
