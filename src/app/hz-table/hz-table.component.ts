import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild, ContentChildren,
  ElementRef, EventEmitter,
  Input, OnDestroy,
  OnInit, Output, QueryList, Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { HzTheadComponent } from './hz-thead/hz-thead.component';
import { HzThComponent } from './hz-th/hz-th.component';
import { map, mergeAll, startWith, takeUntil, throttleTime } from 'rxjs/operators';
import { fromEvent, Observable, Subject } from 'rxjs';
import { merge } from 'rxjs/internal/observable/merge';
import { HzTbodyDirective } from './hz-tbody.directive';

@Component({
  selector: 'app-hz-table',
  templateUrl: './hz-table.component.html',
  styleUrls: ['./hz-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HzTableComponent implements OnInit, AfterViewInit, OnDestroy {
  hzTheadComponent: HzTheadComponent;
  hzTbodyDirective: HzTbodyDirective;
  destroy$ = new Subject();
  @Output() sortKeyChange = new EventEmitter<{key: string, value: 'asc' | 'desc'}>();
  @ViewChild('tbodyElement', {static: false}) tbodyElement: ElementRef;
  @ViewChild('theadElement', {static: false}) theadElement: ElementRef;
  @ViewChild('tableElement', {static: false}) tableElement: ElementRef;
  @ViewChild('theadElementWrap', {static: false}) theadElementWrap: ElementRef;

  constructor(
    private renderer2: Renderer2
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const resize$ = fromEvent(window, 'resize').pipe(
      throttleTime(20)
    );
    const scroll$ = fromEvent(this.tbodyElement.nativeElement, 'scroll');

    const elementChange$ = merge(resize$, scroll$);
    elementChange$.pipe(
      startWith(true),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      // console.log(this.tbodyElement.nativeElement.offsetWidth, this.tbodyElement.nativeElement.scrollWidth, this.tbodyElement.nativeElement.clientWidth);
      this.renderer2.setStyle(this.theadElement.nativeElement, 'left', -this.tbodyElement.nativeElement.scrollLeft + 'px');
      if (this.tbodyElement.nativeElement.scrollWidth > this.tbodyElement.nativeElement.clientWidth) {
        if (this.tbodyElement.nativeElement.scrollLeft === 0) {
          this.renderer2.removeClass(this.tableElement.nativeElement, 'hz-table-scroll-middle');
          this.renderer2.removeClass(this.tableElement.nativeElement, 'hz-table-scroll-right');
          this.renderer2.addClass(this.tableElement.nativeElement, 'hz-table-scroll-left');
        } else if (this.tbodyElement.nativeElement.scrollLeft === (this.tbodyElement.nativeElement.scrollWidth - this.tbodyElement.nativeElement.clientWidth)) {
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
    const mergeChanges$ = merge(this.hzTbodyDirective.listOfHzTrDirective.changes, this.hzTheadComponent.listOfHzThComponent.changes, resize$);
    mergeChanges$.pipe(
      startWith(true),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.renderer2.setStyle(this.theadElementWrap.nativeElement, 'border-right-width', (this.tbodyElement.nativeElement.offsetWidth - this.tbodyElement.nativeElement.clientWidth) + 'px');
      const hzThComponents: HzThComponent[] = this.hzTheadComponent.listOfHzThComponent.toArray();
      if (this.hzTbodyDirective.listOfHzTrDirective.first) {
        this.hzTbodyDirective.listOfHzTrDirective.first.listOfHzTdComponent.forEach((e, i) => {
          this.renderer2.setStyle(hzThComponents[i].element.nativeElement, 'width', e.element.nativeElement.clientWidth + 'px');
          // this.renderer2.setStyle(hzThComponents[i].element.nativeElement.children[0], 'max-width', e.element.nativeElement.clientWidth - 52 + 'px');
        });
      }
    });
    const sortKey$ = merge(...this.hzTheadComponent.listOfHzThComponent.map(th => th.sortChange$)).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      const hzThComponents: HzThComponent[] = this.hzTheadComponent.listOfHzThComponent.toArray();
      hzThComponents.forEach((e) => {
        if (data.key !== e.hzSortKey) {
          e.hzSort = 'asc';
        } else {
          e.hzSort = data.value;
        }
      });
      console.log(data);
      this.sortKeyChange.emit(data);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
