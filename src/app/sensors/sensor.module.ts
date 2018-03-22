import { SensorRouting } from './sensors-routing.module';
import { SensorService } from './sensor.service';
import { WebsocketService } from './websocket.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment/moment.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdSidenavModule, MdToolbarModule, MdIconModule, MdCardModule } from '@angular/material';
import { SensorDetailsComponent } from './sensor-details/sensor-details.component';
import { SensorHistoryComponent } from './sensor-history/sensor-history.component';
import { SensorDashboardComponent } from './sensor-dashboard/sensor-dashboard.component';

@NgModule({
  declarations: [
    SensorDetailsComponent,
    SensorHistoryComponent,
    SensorDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MomentModule,
    MdButtonModule,
    MdSidenavModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    SensorRouting
  ],
  providers: [WebsocketService, SensorService],
})
export class SensorModule { }
