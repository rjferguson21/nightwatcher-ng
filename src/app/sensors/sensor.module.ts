import { SensorRouting } from './sensors-routing.module';
import { SensorService } from './sensor.service';
import { WebsocketService } from './websocket.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment/moment.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule,MatIconModule, MatCardModule, MatTableModule } from '@angular/material';
import { SensorDetailsComponent } from './sensor-details/sensor-details.component';
import { SensorHistoryComponent } from './sensor-history/sensor-history.component';
import { SensorDashboardComponent } from './sensor-dashboard/sensor-dashboard.component';
import { HistoryTableComponent } from './history-table/history-table.component';
@NgModule({
  declarations: [
    SensorDetailsComponent,
    SensorHistoryComponent,
    SensorDashboardComponent,
    HistoryTableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MomentModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    SensorRouting
  ],
  providers: [WebsocketService, SensorService],
})
export class SensorModule { }
