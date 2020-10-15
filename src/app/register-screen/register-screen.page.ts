import { FormsModule } from '@angular/forms';
import { IdentityService } from './../services/identity.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.page.html',
  styleUrls: ['./register-screen.page.scss'],
})
export class RegisterScreenPage implements OnInit {

  constructor(private identityService: IdentityService) { }

  username: string;
  password: string;
  confirmPassword: string;

  ngOnInit() {
  }

  register() {
    this.identityService.register(this.username, this.password, this.confirmPassword);
  }

}
