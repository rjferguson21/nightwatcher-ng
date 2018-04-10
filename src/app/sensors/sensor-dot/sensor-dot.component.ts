import { Mapping } from './../mapping';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sensor-dot`',
  templateUrl: './sensor-dot.component.html',
  styleUrls: ['./sensor-dot.component.css']
})
export class SensorDotComponent implements OnInit {
  @Input() id: string;
  sensorColor = 'white';
  private colors = ['#b5cea8', '#569cd6', '#CE9178', '#cd9731', '#b267e6', '#646695', '#d7ba7d', '#9cdcfe']

  constructor() { }

  ngOnInit() {
    this.sensorColor = this.colors[this.id];
  }
}
