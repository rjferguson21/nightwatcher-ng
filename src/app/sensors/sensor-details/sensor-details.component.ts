import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Mapping } from './../mapping';

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.css'],
  animations: [
    trigger('sensorState', [
      state('0', style({
        transform: 'scale(1)'
      })),
      state('1',   style({
        transform: 'scale(1.01)'
      })),
      transition('0 => 1', animate('100ms ease-in')),
      transition('1 => 0', animate('100ms ease-out'))
    ])
  ]
})
export class SensorDetailsComponent implements OnInit {
  @Input() sensor: any;
  mapping = Mapping;

  constructor() { }

  ngOnInit() {
  }

}
