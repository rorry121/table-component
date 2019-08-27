import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HzTableComponent } from './hz-table.component';
import { HzThComponent } from './hz-th/hz-th.component';
import { HzTdComponent } from './hz-td/hz-td.component';
import { HzTheadComponent } from './hz-thead/hz-thead.component';
import { HzTbodyDirective } from './hz-tbody.directive';
import { HzTrDirective } from './hz-tr.directive';


@NgModule({
  declarations: [
    HzTableComponent,
    HzThComponent,
    HzTdComponent,
    HzTheadComponent,
    HzTbodyDirective,
    HzTrDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [HzTableComponent, HzTheadComponent, HzThComponent, HzTdComponent, HzTrDirective, HzTbodyDirective]
})
export class HzTableModule { }
