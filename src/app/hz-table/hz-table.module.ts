import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HzTableComponent } from './hz-table.component';
import { HzThComponent } from './hz-th/hz-th.component';
import { HzTbodyDirective } from './directives/hz-tbody.directive';
import { HzTrDirective } from './directives/hz-tr.directive';
import { HzTdDirective } from './directives/hz-td.directive';
import { HzTheadDirective } from './directives/hz-thead.directive';


@NgModule({
  declarations: [
    HzTableComponent,
    HzThComponent,
    HzTbodyDirective,
    HzTrDirective,
    HzTdDirective,
    HzTheadDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [HzTableComponent, HzThComponent, HzTrDirective, HzTbodyDirective, HzTdDirective, HzTheadDirective]
})
export class HzTableModule { }
