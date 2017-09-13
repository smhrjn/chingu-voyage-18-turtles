import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isDevMode } from '@angular/core';
import 'rxjs/add/operator/filter';
// import * as auth0 from 'auth0-js';
import auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {

  lock = new auth0Lock('Nla3arENG6y0bBX8F28QLsb0dNtyK00j', 'vochat.eu.auth0.com', {
    oidcConformant: true,
    autoclose: true,
    auth: {
      responseType: 'token id_token',
      audience: 'https://vochat.eu.auth0.com/userinfo',
      redirectUri: 'http://localhost:4200/',
      params: {
        scope: 'openid profile email'
      }
    }
  });

  userProfile: any;

  constructor(public router: Router) {}

  public login(): void {
    this.lock.show();
  }

  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(authResult);
        this.setSession(authResult);
      }
    });
    this.lock.on('authorization_error', (err) => {
      this.router.navigate(['/']);
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
    });
  }

/*   // Call this method in app.component.ts
  // if using hash-based routing
  public handleAuthenticationWithHash(): void {
    this
      .router
      .events
      .filter(event => event instanceof NavigationStart)
      .filter((event: NavigationStart) => (/access_token|id_token|error/).test(event.url))
      .subscribe(() => {
        this.lock.resumeAuth(window.location.hash, (err, authResult) => {
          if (err) {
            this.router.navigate(['/']);
            console.log(err);
            alert(`Error: ${err.error}. Check the console for further details.`);
            return;
          }
          this.setSession(authResult);
          this.router.navigate(['/']);
        });
    });
  } */

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.lock.getUserInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      } else {
        console.log('error getting profile, please log in again');
      }
      cb(err, profile);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload));
    localStorage.setItem('expires_at', expiresAt);
    this.getProfile();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
