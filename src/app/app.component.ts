import { Component, OnInit, OnDestroy } from '@angular/core';

import { MessagingService } from './messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-chat';
  messages = [];
  connection;
  message;
  initialMessages;

  constructor(private messaging: MessagingService) {}

  sendMessage() {
    if (this.message !== '') {
      this.messaging.sendMessage(this.message);
      this.message = '';
    }
  }

  ngOnInit() {
    this.initialMessages = this.messaging.getMessages().subscribe(data => {
      data.forEach(message => this.messages.push(message));
    });
    this.connection = this.messaging.getMessage().subscribe(message => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    this.initialMessages.unsubscribe();
  }
}
