import { Component, OnInit, OnDestroy } from '@angular/core';

import { MessagingService } from './messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  messages = [];
  connection;
  message = '';

  constructor(private messaging: MessagingService) {}

  sendMessage() {
    this.messaging.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.messaging.getMessages().subscribe(message => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
