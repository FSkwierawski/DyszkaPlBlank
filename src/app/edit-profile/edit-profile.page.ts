import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserBuilder } from './../model/User.builder';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './../services/user.service';
import { User } from './../model/User';
import { IdentityService } from './../services/identity.service';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  private selectedImage = '';

  public user = new User();
  profileCreator = new FormGroup({
    profileImage: new FormControl(''),
    userName: new FormControl(''),
    telephoneNumber: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    description: new FormControl('', Validators.maxLength(500))
  });

  constructor(
    private formsModule: FormsModule,
    private identityService: IdentityService,
    private userService: UserService,
    private router: Router,
    private alertController: AlertController
    )
    {

      this.identityService.user$.subscribe(user => {
        this.user = user;
        this.profileCreator.patchValue(user);
      });
    }

  ngOnInit() {

  }

  onSubmit()  {
    this.editAlert();
  }

  createUserFromForm() {
    return{
      profileImage: this.selectedImage,
      userName: this.profileCreator.controls.userName.value,
      telephoneNumber: this.profileCreator.controls.telephoneNumber.value,
      email: this.profileCreator.controls.email.value,
      description: this.profileCreator.controls.description.value
    };
  }

  transformImage(e) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid img format');
      return;
    }
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImage = reader.result.toString();
    };
  }

  async editAlert() {
    const alert = await this.alertController.create({
      header: 'Uwaga!',
      message: 'Czy na pewno chcesz zmienić swoje dane?',
      buttons: [
        {
          text: 'Tak',
          handler: () => {
            const user = this.createUserFromForm();
            console.log(user.profileImage);
            this.userService.editCurrentUser(user).subscribe(response => {
              console.log(response);
              this.router.navigateByUrl(`user-profile/${this.identityService.currentUser$.value}`);
            });
          }
        },
        {
          text: 'Nie',
        }
      ]
    });
    await alert.present();
  }

}
