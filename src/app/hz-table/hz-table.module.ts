import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HzTableComponent } from './hz-table.component';
import { HzTbodyDirective } from './directives/hz-tbody.directive';
import { HzTrDirective } from './directives/hz-tr.directive';
import { HzTdDirective } from './directives/hz-td.directive';
import { HzTheadDirective } from './directives/hz-thead.directive';
import { HzThDirective } from './directives/hz-th.directive';


@NgModule({
  declarations: [
    HzTableComponent,
    HzTbodyDirective,
    HzTrDirective,
    HzTdDirective,
    HzTheadDirective,
    HzThDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [HzTableComponent, HzTrDirective, HzTbodyDirective, HzTdDirective, HzTheadDirective, HzThDirective]
})
export class HzTableModule { }
