import { UserData } from './../interfaces/UserData';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

public user: UserData;
  constructor() {
    this.user = {
      name: 'Jan',
      surname: 'Kowalski',
      description: 'Lorem ipsum',
      phoneNumber: '111222333',
      email: 'xyz@wp.pl'
    };
   }

  ngOnInit() {

  }

}
