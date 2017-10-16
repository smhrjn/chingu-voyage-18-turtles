import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() title: String;

  constructor(public auth: AuthService, private router: Router) {
    auth.handleAuthentication();
  }

  login() {
    // this.auth.login();
    this.router.navigate(['/signup']);
  }

}
