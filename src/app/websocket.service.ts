import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import websocketConnect from 'rxjs-websockets';
import * as Nes from 'nes';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WebsocketService {
  public eventStream: Subject<any>;
  public messages: Observable<any>;
  public client: any;

  constructor() {
    this.eventStream = new Subject();
  }

  public connect() {
    // Using share() causes a single websocket to be created when the first
    // observer subscribes. This socket is shared with subsequent observers
    // and closed when the observer count falls to zero.
    this.client = new Nes.Client(environment.ws);
    this.client.connect().then(() => {
      console.log('connected to ws');
      this.client.onUpdate = (data) => {
        this.eventStream.next(data);
      };
    });
  }
}
