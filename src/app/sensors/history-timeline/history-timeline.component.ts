import { DifferencePipe } from 'angular2-moment';
import { Mapping } from './../mapping';
import { SensorService, SensorHistoryEvent, Sensor } from './../sensor.service';
import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { D3Service, D3, Selection, AxisScale } from 'd3-ng2-service';
import { minBy, maxBy, groupBy } from 'lodash';
import * as d3radial from 'd3-radial-axis';

console.log(d3radial);

@Component({
  selector: 'app-history-timeline',
  templateUrl: './history-timeline.component.html'
})
export class HistoryTimelineComponent implements OnChanges, OnInit {
  @Input() history: SensorHistoryEvent[];
  overview: 'day';

  private d3: D3;
  private parentNativeElement: any;
  private colors = ['#ccc', '#ccf', '#cff', '#c44', '#c12', '#f74', '#edd', '#233'];

  constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }

  axisColor(event: SensorHistoryEvent): string {
    return this.colors[parseInt(event.sensorId, 0)];
  }

  yPosition(event: SensorHistoryEvent): number {
    return 25 * parseInt(event.sensorId, 0);
  }

  scaleTime(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

  ngOnInit() {}

  ngOnChanges() {
    const d3 = this.d3; // <-- for convenience use a block scope variable
    let d3ParentElement: Selection<any, any, any, any>; // <-- Use the Selection interface (very basic here for illustration only)

    if (this.history && this.history.length > 0 && this.parentNativeElement !== null) {

      d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method

      const r = Math.min(this.parentNativeElement.offsetWidth, this.parentNativeElement.offsetHeight) / 2;
      const hourScale = d3.scaleLinear().domain([0, 12]).range([0, 360]);

      const angle = d3.scaleTime().range([0, 2 * Math.PI]);

      const svgContainer = d3ParentElement.append('svg')
        .style('width', '100%')
        .style('height', '600px')
        .attr('viewBox', `${-r} ${-r} ${r * 2} ${r * 2}`);

      console.log(this.parentNativeElement);

      const buffer = 1000 * 60 * 120;
      const min = new Date(this.history[0].lastUpdated);
      const max = new Date(this.history[this.history.length - 1].lastUpdated);

      const timeScale = d3.scaleLinear().domain([min, max]).range([0, 360]);

      const scale = this.d3.scaleTime()
        .domain([this.scaleTime(max, -15), this.scaleTime(min, 15)])
        .range([0, this.parentNativeElement.offsetWidth]);

      const radialAxis = d3radial.axisRadialInner(
        hourScale.copy().range([0, 2 * Math.PI]),
        r - 1
      ).ticks(12)
      .tickSize(12);

      const xAxis = this.d3.axisBottom(scale);

      svgContainer.append('g')
        .style('stroke', 'white')
        .style('font-size', '12px')
        .call(radialAxis);

      const circles = svgContainer.selectAll('circle')
        .data(this.history)
        .enter()
        .append('circle')
        .style('stroke', this.axisColor.bind(this))
        .attr('cx', (event) => {
          const date = new Date(event.lastUpdated);
          return timeScale(date);
        })
        .attr('cy', (event) => {
          const date = new Date(event.lastUpdated);
          console.log(timeScale(date));
          return timeScale(date);
        })
        .attr('r', 6)
        .append('svg:title')
        .text((event) => {
          return new Date(event.lastUpdated).toString();
        });
    }
  }
}
