import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild, ContentChildren,
  ElementRef,
  Input, OnDestroy,
  OnInit, QueryList, Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { HzTheadComponent } from './hz-thead/hz-thead.component';
import { HzTrComponent } from './hz-tr/hz-tr.component';
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
  @ViewChild('tbodyElement', {static: false}) tbodyElement: ElementRef;
  @ViewChild('theadElement', {static: false}) theadElement: ElementRef;
  @ViewChild('tableElement', {static: false}) tableElement: ElementRef;

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
      console.log(this.tbodyElement.nativeElement.scrollWidth, this.tbodyElement.nativeElement.clientWidth);
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
    const mergeChanges$ = merge(this.hzTbodyDirective.listOfHzTrComponent.changes, this.hzTheadComponent.listOfHzThComponent.changes, resize$);
    mergeChanges$.pipe(
      startWith(true),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const hzThComponents: HzThComponent[] = this.hzTheadComponent.listOfHzThComponent.toArray();
      if (this.hzTbodyDirective.listOfHzTrComponent.first) {
        this.hzTbodyDirective.listOfHzTrComponent.first.listOfHzTdComponent.forEach((e, i) => {
          this.renderer2.setStyle(hzThComponents[i].element.nativeElement, 'width', e.element.nativeElement.clientWidth + 'px');
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
