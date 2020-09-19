import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../model/User';
import { BehaviorSubject } from 'rxjs';
import { UserData } from './../interfaces/UserData';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  user$ = new BehaviorSubject<User>(null);

public user: UserData;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
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
