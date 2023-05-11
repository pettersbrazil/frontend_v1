import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { PanelRoutingModule } from './panel-routing.module';

import { PanelComponent } from './panel.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [
    PanelRoutingModule,
    SharedModule,
  ],
  declarations: [
    PanelComponent,
    ChartComponent
  ]
})
export class PanelModule { }
