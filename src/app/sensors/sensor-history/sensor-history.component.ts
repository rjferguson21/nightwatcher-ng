import { Mapping } from './../mapping';
import { SensorService, SensorHistoryEvent, Sensor } from './../sensor.service';
import { Component, OnInit } from '@angular/core';
import { ResponsiveActivation } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-sensor-history',
  templateUrl: './sensor-history.component.html',
  styleUrls: ['./sensor-history.component.css']
})
export class SensorHistoryComponent implements OnInit {
  public history: SensorHistoryEvent[];
  public sensor: Sensor;

  constructor(
    private sensorService: SensorService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.sensorService.get(id).first().subscribe((sensor) => {
      sensor.name = Mapping[sensor.id].desc;
      this.sensor = sensor;
    });

    this.sensorService.history(id).first().subscribe((history) => {
      this.history = history;
    });
  }
}
