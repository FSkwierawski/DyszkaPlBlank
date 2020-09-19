import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  profileCreator = new FormGroup({
    image: new FormControl(''),
    userName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private formsModule: FormsModule
    ) { }

  ngOnInit() {
  }

  onSubmit()  {
  }

}
