import { Mapping } from './../mapping';
import { SensorService, SensorHistoryEvent, Sensor } from './../sensor.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ResponsiveActivation } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/first';
import { DifferencePipe } from 'angular2-moment';

interface HistoryDetail {
  name: string;
  date: Date;
  value: number;
}

interface HistoryData {
  date: string;
  total: number;
  details: HistoryDetail[];
}

@Component({
  selector: 'app-history-heatmap',
  templateUrl: './history-heatmap.component.html'
})
export class HistoryHeatmapComponent implements OnInit, OnChanges {
  @Input() history: SensorHistoryEvent[];
  historyData: HistoryData[];
  overview: 'day';

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.history) {
      console.log(this.history);
      // convert to data
      const first = this.history[0];
      const last = this.history[this.history.length - 1];
      const momentDifferencePipe = new DifferencePipe();
      let total = momentDifferencePipe.transform(new Date(first.lastUpdated), new Date(last.lastUpdated)) / 1000;
      total = Math.floor(total);

      console.log(total);

      this.historyData = [{
        date: '2018-03-26',
        total: total,
        details: this.history.map((event: SensorHistoryEvent) => {
          console.log(new Date(event.lastUpdated).getTime() / 1000);
          return {
            name: event.name,
            date: new Date(event.lastUpdated),
            value: 1,
          } as HistoryDetail;
        })
      }];
    }
  }
}
