import { UserBuilder } from './../model/User.builder';
import { IdentityService } from './../services/identity.service';
import { UserService } from './../services/user.service';
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
  user = new User();
  currentUser: string;
  loading = true;
  name: string;

public user: UserData;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private identityService: IdentityService,
    private activatedroute: ActivatedRoute) {
    this.user = {
      name: 'Jan',
      surname: 'Kowalski',
      description: 'Lorem ipsum',
      phoneNumber: '111222333',
      email: 'xyz@wp.pl'
    };
   }

  ngOnInit() {
    const username = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUserByName(username).subscribe ((userDetails: User) => {
      this.userService.getUserIdentityData(username).subscribe(identityUser => {
        this.user$.next(new UserBuilder().addApplicationData(userDetails).addIdentityData(identityUser).build());
        this.identityService.user$.next(new UserBuilder().addApplicationData(userDetails).addIdentityData(identityUser).build());
        this.loading = false;
        this.name = this.user$.value.userName;
      });
      this.identityService.user$.subscribe(userInfromations => {
        this.user = userInfromations;
      });
    });
  }

  openProfileDataeditor() {
    this.router.navigateByUrl('/edit-profile');
  }

}
