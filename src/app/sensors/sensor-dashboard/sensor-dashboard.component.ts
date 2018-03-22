import { Subscription } from 'rxjs/Subscription';
import { SensorService, SensorStore, SensorHistoryEvent } from './../sensor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensor-dashboard',
  templateUrl: './sensor-dashboard.component.html',
  styleUrls: ['./sensor-dashboard.component.css']
})
export class SensorDashboardComponent implements OnInit {
  private socketSubscription: Subscription;
  messages: string[] = [];
  displayedColumns = ['name', 'sensorId', 'fromStatus', 'toStatus', 'lastUpdated'];
  public sensorStore: SensorStore;
  public history: SensorHistoryEvent[];


  constructor(public sensorService: SensorService) { }

  ngOnInit() {
    this.sensorService.list().subscribe(store => store = this.sensorStore);
    this.sensorService.allHistory().first().subscribe((history: SensorHistoryEvent[]) => {
      this.history = history;
    });
  }

}
