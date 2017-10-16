import { Component, OnInit } from '@angular/core';

import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  private show = 'form';
  private userName = 'me';
  private email = 'me@mymail.com';
  private password = 'myPassword';
  private passwordRepeat = 'myPassword';
  private errorsSignUp = {
    userName: undefined,
    email: undefined,
    password: undefined,
    passwordRepeat: undefined,
  };
  private errorsLogin = {
    userName: undefined,
    password: undefined
  };
  private errorApi = [];

  constructor(private messaging: MessagingService) { }

  private onSubmit = () => {
    let errorCount = 0;
    if (this.userName === '') {
      this.errorsSignUp.userName = 'Please Provide User Name';
      errorCount++;
    }
    if (this.email === '') {
      this.errorsSignUp.email = 'Please Provide Email Address';
      errorCount++;
    }
    if (this.password === '') {
      this.errorsSignUp.password = 'Please Provide Password';
      errorCount++;
    }
    if (this.passwordRepeat === '') {
      this.errorsSignUp.passwordRepeat = 'Please Confirm Password';
      errorCount++;
    } else if (this.password !== this.passwordRepeat) {
      this.errorsSignUp.passwordRepeat = 'Passwords Do Not Match';
      errorCount++;
    }
    if (errorCount === 0) {
      this.messaging.signUp({
        name: this.userName,
        email: this.email,
        password: this.password
      });
    }
  }

  private resetError = () => {
    this.errorsSignUp = {
      userName: undefined,
      email: undefined,
      password: undefined,
      passwordRepeat: undefined,
    };
  }

  private onLogin = () => {
    let errorCount = 0;
    if (this.userName === '') {
      this.errorsLogin.userName = 'Please Provide User Name';
      errorCount++;
    }
    if (this.password === '') {
      this.errorsLogin.password = 'Please Provide Password';
      errorCount++;
    }
    // if (errorCount === 0) {
    //   notesApi.login({
    //     name: this.userName,
    //     password: this.password
    //   }).then(response => {
    //   }).catch(err => {
    //     this.errorApi = err;
    //   });
    // }
  }

  private resetLoginError = () => {
    this.errorsLogin = {
      userName: undefined,
      password: undefined,
    };
    this.errorApi = [];
  }

  ngOnInit() {
  }
}
