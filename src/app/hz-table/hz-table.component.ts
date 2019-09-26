import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter, OnDestroy,
  OnInit, Output, Renderer2,
  ViewChild
} from '@angular/core';
import { map, startWith, takeUntil, throttleTime, concatAll } from 'rxjs/operators';
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
    const tBodyScroll$ = fromEvent(this.tbodyScrollElement.nativeElement, 'scroll');
    const tBodyMouseenter$ = fromEvent(this.tbodyScrollElement.nativeElement, 'mouseenter');
    const tBodyMouseleave$ = fromEvent(this.tbodyScrollElement.nativeElement, 'mouseleave');
    const tHeadScroll$ = fromEvent(this.theadElementWrap.nativeElement, 'scroll');
    const tHeadMouseenter$ = fromEvent(this.theadElementWrap.nativeElement, 'mouseenter');
    const tHeadMouseleave$ = fromEvent(this.theadElementWrap.nativeElement, 'mouseleave');
    tHeadMouseenter$.pipe(
      map(event => tHeadScroll$.pipe(takeUntil(tHeadMouseleave$))),
      concatAll(),
      takeUntil(this.destroy$)
    ).subscribe(event => {
      // 滑动 head 同时滑动 body
      this.renderer2.setProperty(this.tbodyScrollElement.nativeElement, 'scrollLeft', this.theadElementWrap.nativeElement.scrollLeft);
    });

    tBodyMouseenter$.pipe(
      map(event => tBodyScroll$.pipe(takeUntil(tBodyMouseleave$))),
      concatAll(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      // 滑动 body 同时滑动 head
      this.renderer2.setProperty(this.theadElementWrap.nativeElement, 'scrollLeft', this.tbodyScrollElement.nativeElement.scrollLeft);
      // 为固定列添加样式
      this.fixedColCalc();
    });

    const resize$ = fromEvent(window, 'resize').pipe(
      throttleTime(20)
    );
    const mergeChanges$ = merge(this.hzTbodyDirective.listOfHzTrDirective.changes, this.HzTheadDirective.listOfHzThDirective.changes, resize$);
    mergeChanges$.pipe(
      startWith(true),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      setTimeout(() => {
        // thead 头部有无 纵向 滚动条根据 tbody 是否有滚动条（resize, 初始化）
        const width = this.tbodyScrollElement.nativeElement.offsetWidth - this.tbodyScrollElement.nativeElement.clientWidth;
        if (width > 0) {
          this.renderer2.setStyle(this.theadElementWrap.nativeElement, 'overflow-y', 'scroll');
        } else {
          this.renderer2.setStyle(this.theadElementWrap.nativeElement, 'overflow-y', 'hidden');
        }
        // thead 高度  = 横向滚动条高度 + 内容高度
        const height = this.theadElementWrap.nativeElement.offsetHeight - this.theadElementWrap.nativeElement.clientHeight;
        this.renderer2.setStyle(this.theadElementWrap.nativeElement, 'margin-bottom', -height + 'px');
        this.renderer2.setStyle(this.theadElementWrap.nativeElement, 'height', (height + 36) + 'px');
        // 为固定列添加样式
        this.fixedColCalc();
        if (this.HzTheadDirective.listOfHzThDirective.length > 0) {
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

  fixedColCalc() {
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
  }
}
