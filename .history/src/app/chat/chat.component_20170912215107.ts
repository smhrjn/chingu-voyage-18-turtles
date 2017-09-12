import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages = [];
  connection;
  message;
  initialMessages;

  constructor(private messaging: MessagingService, public auth: AuthService) {

  }

  ngOnInit() {
  }

}
