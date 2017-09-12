import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;
  initialMessages;

  constructor(private messaging: MessagingService) {

  }

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
