import { SensorService, Sensor } from './../sensor.service';
import { Component, OnInit } from '@angular/core';
import { ResponsiveActivation } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sensor-history',
  templateUrl: './sensor-history.component.html',
  styleUrls: ['./sensor-history.component.css']
})
export class SensorHistoryComponent implements OnInit {
  public sensors: Sensor[];

  constructor(
    private sensorService: SensorService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.sensorService.history(id).subscribe((sensors) => {
      this.sensors = sensors;
    });
  }
}
