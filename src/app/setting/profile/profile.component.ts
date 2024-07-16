import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
user:any;

  constructor( private _authService : AuthService) { }

  ngOnInit(): void {
    this._authService.userData.subscribe(user => {
      this.user = user;
    });
  }

}

