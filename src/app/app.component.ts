import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { MessagingService } from './messaging.service';

import { ProfileComponent } from './profile/profile.component';

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
  profile: any = {};

  constructor(private messaging: MessagingService, public auth: AuthService) {
    auth.handleAuthentication();
  }

  sendMessage() {
    if (this.message !== '') {
      this.messaging.sendMessage(this.message);
      this.message = '';
    }
  }

  login() {
    this.auth.login();
    // if (this.auth.userProfile) {
    //   this.profile = this.auth.userProfile;
    // } else {
    //   this.auth.getProfile((err, profile) => {
    //     this.profile = profile;
    //   });
    // }
  }

  ngOnInit() {
    this.initialMessages = this.messaging.getMessages().subscribe(data => {
      data.forEach(message => this.messages.push(message));
    });
    this.connection = this.messaging.getMessage().subscribe(message => {
      this.messages.push(message);
    });
    this.profile = this.auth.userProfile;
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    this.initialMessages.unsubscribe();
  }
}
