import { SensorService, SensorStore } from './sensor.service';
import { WebsocketService } from './websocket.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private socketSubscription: Subscription;
  messages: string[] = [];
  public sensorStore: SensorStore;

  constructor(private socket: WebsocketService, public sensorService: SensorService) { }

  ngOnInit() {
    this.sensorService.get().subscribe(store => store = this.sensorStore);
  }

  ngOnDestroy() {
  }
}
