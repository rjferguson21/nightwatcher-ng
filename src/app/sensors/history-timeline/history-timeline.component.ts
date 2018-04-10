import { DifferencePipe } from 'angular2-moment';
import { Mapping } from './../mapping';
import { SensorService, SensorHistoryEvent, Sensor } from './../sensor.service';
import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { D3Service, D3, Selection, AxisScale } from 'd3-ng2-service';
import { minBy, maxBy, groupBy } from 'lodash';
import * as d3radial from 'd3-radial-axis';
import * as moment from 'moment';

@Component({
  selector: 'app-history-timeline',
  templateUrl: './history-timeline.component.html',
  styleUrls: ['./history-timeline.css']
})
export class HistoryTimelineComponent implements OnChanges, OnInit {
  @Input() history: SensorHistoryEvent[];
  @Input() amOrPm: 'am' | 'pm' = 'pm';
  min: Date;
  max: Date;
  overview: 'day';

  private d3: D3;
  private parentNativeElement: any;
  private colors = ['#b5cea8', '#569cd6', '#CE9178', '#cd9731', '#b267e6', '#646695', '#d7ba7d', '#9cdcfe']

  constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }

  axisColor(event: SensorHistoryEvent): string {
    return this.colors[parseInt(event.sensorId, 0)];
  }

  scaleTime(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60 * 1000);
  }

  toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  ngOnInit() {
    if (this.amOrPm === 'pm') {
      this.min = moment().endOf('day').toDate();
      this.max = moment().endOf('day').subtract(12, 'hours').toDate();
    } else {
      this.max = moment().startOf('day').toDate();
      this.min = moment().startOf('day').add(12, 'hours').toDate();
    }
    console.log(this.min, this.max);
  }

  ngOnChanges() {
    console.log('changes', this.history);
    // this.history = this.history.filter(event => event.toStatus === '1');
    const d3 = this.d3; // <-- for convenience use a block scope variable
    let d3ParentElement: Selection<any, any, any, any>; // <-- Use the Selection interface (very basic here for illustration only)

    if (this.history && this.history.length > 0 && this.parentNativeElement !== null) {

      d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method

      const r = Math.min(this.parentNativeElement.offsetWidth, this.parentNativeElement.offsetHeight) / 2;

      const svgContainer = d3ParentElement.append('svg')
        .style('width', '100%')
        .style('height', '500px')
        .attr('viewBox', `${-r} ${-r} ${r * 2} ${r * 2}`);

      const hourScale = d3.scaleLinear().domain([0, 12]).range([0, 360]);
      const timeScale = d3.scaleTime().domain([this.max, this.min]).range([0, 360]).clamp(true);
      const secMinScale = d3.scaleLinear().domain([0, 60]).range([0, 360]);

      const pointersRelDimensions = [
        { class: 'hour', width: 0.03, height: 0.55 },
        { class: 'min', width: 0.03, height: 0.85 },
        { class: 'sec', width: 0.02, height: 0.85 }
      ];

      const radialAxis = d3radial.axisRadialInner(
        hourScale.copy().range([0, 2 * Math.PI]),
        r - 1
      ).ticks(12)
      .tickSize(12);

      svgContainer.append('g').classed('minor-ticks', true)
      .call(d3radial.axisRadialInner(
            secMinScale.copy().range([0, 2 * Math.PI]),
            r - 1
        )
        .ticks(60)
        .tickSize(6)
      );

      svgContainer.append('circle').classed('background', true)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', r);


      svgContainer.append('g').classed('axis', true)
        .style('stroke', 'white')
        .style('stroke', 'white')
        .style('font-size', '22px')
        .call(radialAxis);


      // Add pointers
      svgContainer.append('g').classed('pointers', true)
      .attr('transform', `scale(${r})`)
      .selectAll('rect')
          .data(pointersRelDimensions)
          .enter()
              .append('rect')
              .attr('class', d => d.class)
              .attr('x', d => -d.width / 2)
              .attr('y', d => -d.height + d.width / 2)
              .attr('width', d => d.width)
              .attr('height', d => d.height)
              .attr('rx', 0.02)
              .attr('ry', 0.03);

      // Add center
      svgContainer.select('.pointers')
      .append('circle').classed('center', true)
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', 0.02);

      const circles = svgContainer.selectAll('circle')
        .data(this.history)
        .enter()
        .append('circle')
        .style('stroke', '#000')
        .style('fill', this.axisColor.bind(this))
        .attr('cx', (event) => {
          const date = new Date(event.lastUpdated);
          return r * Math.cos(this.toRadians(timeScale(date) - 90));
        })
        .attr('cy', (event) => {
          const date = new Date(event.lastUpdated);
          return r * Math.sin(this.toRadians(timeScale(date) - 90));
        })
        .attr('r', 8)
        .append('svg:title')
        .text((event) => {
          const date = moment(event.lastUpdated).format('MMMM Do YYYY, h:mm:ss a');
          return Mapping[event.sensorId].desc + ' tripped ' + date + `${event.toStatus}`;
        });
      // Kick-off clock

      const framed = () => {
        const dt = new Date();

        const ms = dt.getMilliseconds(),
            secs = dt.getSeconds() + ms / 1000,
            mins = dt.getMinutes() + secs / 60,
            hours = dt.getHours() % 12 + mins / 60;

        d3.select('.pointers .hour').attr('transform', `rotate(${hourScale(hours)})`);
        d3.select('.pointers .min').attr('transform', `rotate(${secMinScale(mins)})`);
        d3.select('.pointers .sec').attr('transform', `rotate(${secMinScale(secs)})`);

        requestAnimationFrame(framed);
      };

      framed();
    }
  }
}
