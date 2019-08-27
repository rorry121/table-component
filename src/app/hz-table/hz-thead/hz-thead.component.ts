import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ContentChildren,
  ElementRef, EmbeddedViewRef,
  Host, OnDestroy,
  OnInit, Optional, QueryList,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { HzTableComponent } from '../hz-table.component';
import { HzThComponent } from '../hz-th/hz-th.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { startWith } from 'rxjs/internal/operators/startWith';
import { HzTrDirective } from '../hz-tr.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'thead:not(.hz-table-thead)',
  templateUrl: './hz-thead.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HzTheadComponent implements OnInit, AfterViewInit, OnDestroy {
  embeddedViewRef: EmbeddedViewRef<void>;
  @ViewChild('contentTemplate', {static: true}) templateRef: TemplateRef<void>;
  @ContentChildren(HzThComponent, {descendants: true}) listOfHzThComponent: QueryList<HzThComponent>;
  @ContentChildren(HzTrDirective, {descendants: true}) listOfHzTrDirective: QueryList<HzTrDirective>;
  destroy$ = new Subject();

  constructor(
    private renderer2: Renderer2,
    public element: ElementRef,
    @Host() @Optional() public hzTableComponent: HzTableComponent,
  ) {
    if (this.hzTableComponent) {
      this.hzTableComponent.hzTheadComponent = this;
    }
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    if (this.hzTableComponent) {
      this.renderer2.removeChild(this.renderer2.parentNode(this.element.nativeElement), this.element.nativeElement);
    }
    // this.embeddedViewRef = this.templateRef.createEmbeddedView();
    // console.log('listOfHzThComponent:', this.listOfHzThComponent);
    // console.log('listOfHzTrComponent:', this.listOfHzTrComponent);
    this.listOfHzThComponent.changes
      .pipe(
        startWith(true),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        console.log('listOfHzThComponent-changes');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
