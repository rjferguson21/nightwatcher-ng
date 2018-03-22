import { Mapping } from './../mapping';
import { SensorService, SensorHistoryEvent, Sensor } from './../sensor.service';
import { Component, OnInit, Input } from '@angular/core';
import { ResponsiveActivation } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html'
})
export class HistoryTableComponent implements OnInit {
  @Input() history: SensorHistoryEvent[];
  @Input() displayedColumns = ['id', 'sensorId', 'fromStatus', 'toStatus', 'lastUpdated'];

  constructor() { }

  ngOnInit() { }
}
