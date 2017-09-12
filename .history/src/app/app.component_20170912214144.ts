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

}
