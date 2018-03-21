import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { WebsocketService } from './websocket.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/distinct';
import * as _ from 'lodash';


export class Sensor {
  id: string;
  lastUpdated: Date;
  status: string;
}

export class SensorStore {
  private _sensors: Sensor[] = [];

  update(sensor: Sensor) {
    _.remove(this._sensors, { id: sensor.id });
    this._sensors.push(sensor);
  }

  get(): Sensor[] {
    return this._sensors;
  }
}

@Injectable()
export class SensorService {
  private socketSubscription: Subscription;
  public sensorStore: SensorStore;


  constructor(public http: Http, private socket: WebsocketService) {
    this.socket.connect();
    this.sensorStore = new SensorStore;
  }

  list(): Observable<SensorStore> {
    return this.http.get('/api/sensors')
                    .flatMap( (response: Response) => {
                      return response.json();
                    })
                    .concat(this.socket.eventStream.map(data => {
                      console.log('data', data);
                      return data;
                    }))
                    .map( data => {
                      this.sensorStore.update(data as Sensor);
                      return this.sensorStore;
                    });
  }
  get(id: string): Observable<Sensor> {
    return this.http.get('/api/sensors/' + id)
                    .map( (response: Response) => {
                      return response.json();
                    });
  }
  history(id: string): Observable<Sensor[]> {
    return this.http.get('/api/sensors/' + id + '/history')
                    .map( (response: Response) => {
                      return response.json();
                    });
  }
}
