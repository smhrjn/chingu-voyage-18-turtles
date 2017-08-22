import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { MessagingService } from './messaging.service';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CallbackComponent } from './callback/callback/callback.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: 'contacts', component: ContactsComponent },
  { path: 'callback', component: CallbackComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/contacts',
  //   pathMatch: 'full'
  // }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    ContactsComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    MessagingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
