import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {
  specialEvents = [];
  constructor(
    private _eventService: EventService,
    private _router: Router,
    private _authService: AuthService) { }

  ngOnInit() {
    this._eventService.getSpecialEvents()
      .subscribe(
        res => this.specialEvents = res,
        err => { debugger;
          if (err instanceof HttpErrorResponse){
            if (err.status === 401){
              this._authService.logoutUser();
              this._router.navigate(['/login']);
            }
          }
        }
      );
  }

}
