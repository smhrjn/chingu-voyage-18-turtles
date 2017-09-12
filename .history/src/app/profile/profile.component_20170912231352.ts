import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { ContactsComponent } from '../contacts/contacts.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  profile: any = {};

  constructor(public auth: AuthService) {

  }

  ngOnInit() {
    this.auth.getProfile((err, data) => {
      if (!err) {
        this.profile = data;
      }
    });
    // this.profile = JSON.parse(localStorage.getItem('profile'));
  }

}
