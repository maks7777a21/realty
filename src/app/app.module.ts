import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NavbarComponent } from './navbar/navbar.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { AuthGuard } from './auth.guard';
import {TokenInterceptorService } from './token-interceptor.service';
import { NotifierModule } from 'angular-notifier';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    BsDropdownModule.forRoot(),
    NotifierModule,
  ],
  providers: [AuthService, AuthGuard, EventService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
