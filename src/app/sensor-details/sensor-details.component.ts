import { Component, OnInit, Input } from '@angular/core';
import { Mapping } from './../mapping';

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.css']
})
export class SensorDetailsComponent implements OnInit {
  @Input() sensor: any;
  mapping = Mapping;

  constructor() { }

  ngOnInit() {
  }

}
