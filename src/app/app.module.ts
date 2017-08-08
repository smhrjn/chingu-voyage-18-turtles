import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { MessagingService } from './messaging.service';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CallbackComponent } from './callback/callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    MessagingService
    // Router
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
