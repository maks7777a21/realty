import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  param = {value: 'world'};

  constructor( public translate: TranslateService, 
    private _authService: AuthService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('ua');

       // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('ua');
  }

  setLang(lang: string) {
    this.translate.use(lang);
    console.log({translate: lang});
  }

}
