import { Subscription } from 'rxjs/Subscription';
import { SensorService, SensorStore, SensorHistoryEvent } from './../sensor.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-sensor-dashboard',
  templateUrl: './sensor-dashboard.component.html',
  styleUrls: ['./sensor-dashboard.component.css']
})
export class SensorDashboardComponent implements OnInit {
  private socketSubscription: Subscription;
  messages: string[] = [];
  displayedColumns = ['dot', 'name', 'statusDesc', 'lastUpdated'];
  public sensorStore: SensorStore;
  public history: SensorHistoryEvent[];
  public amHistory: SensorHistoryEvent[];
  public pmHistory: SensorHistoryEvent[];

  constructor(public sensorService: SensorService) { }

  ngOnInit() {
    const pmEnd = moment().endOf('day').toDate();
    const pmStart = moment().endOf('day').subtract(12, 'hours').toDate();
    const amStart = moment().startOf('day').toDate();
    const amEnd = moment().startOf('day').add(12, 'hours').toDate();

    const twelveHoursAgo = moment().subtract(12, 'hours').toDate();

    this.sensorService.list().subscribe(store => store = this.sensorStore);

    // AM
    this.sensorService.allHistory(amStart, amEnd)
      .first()
      .subscribe((history: SensorHistoryEvent[]) => {
        this.amHistory = history;
      });

    // PM
    this.sensorService.allHistory(pmStart, pmEnd)
      .subscribe((history: SensorHistoryEvent[]) => {
        this.pmHistory = history;
      });

    // Last 12 hours
    this.sensorService.allHistory(twelveHoursAgo, new Date())
      .first()
      .subscribe((history: SensorHistoryEvent[]) => {
        this.history = history;
      });
  }

}
