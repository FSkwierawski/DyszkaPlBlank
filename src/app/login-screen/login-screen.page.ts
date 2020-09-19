import { IdentityService } from './../services/identity.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
})
export class LoginScreenPage implements OnInit {

  username: string;
  password: string;

  constructor(
    private router: Router,
    private identityService: IdentityService
    ) { }

  ngOnInit() {
  }

  toRegisterScreen = function() {
    this.router.navigateByUrl('/register-screen');
  };

  toMainMenu = function() {
    this.router.navigateByUrl('user-profile');
  };

  login() {
    this.identityService.logIn(this.username, this.password);
    this.router.navigateByUrl('/offer-screen');
  }

}
