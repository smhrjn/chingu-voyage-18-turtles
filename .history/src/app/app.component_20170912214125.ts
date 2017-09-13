import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { MessagingService } from './messaging.service';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-chat';
  messages = [];
  connection;
  message;
  initialMessages;

  constructor(private messaging: MessagingService, public auth: AuthService) {
    auth.handleAuthentication();
  }



  login() {
    this.auth.login();
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
