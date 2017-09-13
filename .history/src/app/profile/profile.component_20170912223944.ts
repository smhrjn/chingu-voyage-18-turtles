import { Component, onInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { ContactsComponent } from '../contacts/contacts.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements onInit {
  profile: any;

  constructor(public auth: AuthService) {

  }

  ngOnInit() {

  }

}
