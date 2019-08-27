import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HzTableComponent } from './hz-table.component';
import { HzThComponent } from './hz-th/hz-th.component';
import { HzTdComponent } from './hz-td/hz-td.component';
import { HzTheadComponent } from './hz-thead/hz-thead.component';
import { HzTrComponent } from './hz-tr/hz-tr.component';
import { HzTbodyDirective } from './hz-tbody.directive';


@NgModule({
  declarations: [
    HzTableComponent,
    HzThComponent,
    HzTdComponent,
    HzTheadComponent,
    HzTrComponent,
    HzTbodyDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [HzTableComponent, HzTheadComponent, HzThComponent, HzTdComponent, HzTrComponent, HzTbodyDirective]
})
export class HzTableModule { }
