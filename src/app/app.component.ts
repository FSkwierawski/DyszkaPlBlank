import { Router } from '@angular/router';
import { IdentityService } from './services/identity.service';
import { UserData } from './interfaces/UserData';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  currentUser: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private identityService: IdentityService,
    private router: Router,
    private identityservice: IdentityService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logOut() {
    this.identityService.logout();
  }

  openCurrentUserProfile(){
    this.identityService.currentUser$.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
    this.router.navigateByUrl(`/user-profile/${this.currentUser}`);

  }
}
