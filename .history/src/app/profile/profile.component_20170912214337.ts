import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { MessagingService } from './messaging.service';
import { ContactsComponent } from '../contacts/contacts.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: any;

  constructor(private messaging: MessagingService, public auth: AuthService) {

  }

  sendMessage() {
    if (this.message !== '') {
      this.messaging.sendMessage(this.message);
      this.message = '';
    }
  }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
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
