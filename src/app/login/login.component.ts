import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData = {};
  //private readonly notifier: NotifierService;
  constructor(
    public translate: TranslateService,
    private _auth: AuthService, 
    private _router: Router,
    private _notifier: NotifierService ) { }

  ngOnInit() {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this._router.navigate(['/special']);
          console.log(res);
        },
        err => {
          if (err.error === 'Invalid credentials') {
            this.translate.get('INVALID_CREDENTIALS').subscribe((res: string) => {
              this._notifier.notify('error', res);
            });
          } else {
            console.log(err);
          }
        }
      );
  }
  //INVALID_CREDENTIALS
}
