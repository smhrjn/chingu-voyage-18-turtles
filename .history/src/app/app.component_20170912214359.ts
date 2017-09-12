import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'ng-chat';

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  login() {
    this.auth.login();
  }

}
