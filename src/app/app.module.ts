import { SensorService } from './sensor.service';
import { WebsocketService } from './websocket.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdSidenavModule, MdToolbarModule, MdIconModule, MdCardModule } from '@angular/material';
import { AppComponent } from './app.component';
import { SensorDetailsComponent } from './sensor-details/sensor-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SensorDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdSidenavModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule
  ],
  providers: [WebsocketService, SensorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
