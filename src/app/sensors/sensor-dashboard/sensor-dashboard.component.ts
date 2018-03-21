import { Subscription } from 'rxjs/Subscription';
import { SensorService, SensorStore } from './../sensor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensor-dashboard',
  templateUrl: './sensor-dashboard.component.html',
  styleUrls: ['./sensor-dashboard.component.css']
})
export class SensorDashboardComponent implements OnInit {
  private socketSubscription: Subscription;
  messages: string[] = [];
  public sensorStore: SensorStore;

  constructor(public sensorService: SensorService) { }

  ngOnInit() {
    this.sensorService.list().subscribe(store => store = this.sensorStore);
  }

}
