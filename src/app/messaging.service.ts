import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';

import { isDevMode } from '@angular/core';

@Injectable()
export class MessagingService {
  private url = isDevMode() ? 'http://localhost:8080' : 'http://vochat-api.herokuapp.com';
  private socket;

  constructor(private http: HttpClient) {

  }

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  getMessage() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

   getMessages() {
    console.log('Getting messages');
    return this.http.get(this.url + '/messages').map(data => _.values(data));
  }
}
