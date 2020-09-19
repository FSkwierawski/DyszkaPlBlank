import { FormGroup, FormsModule, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  profileCreator = new FormGroup({
    image: new FormControl(''),
    userName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private formsModule: FormsModule) { }

  ngOnInit() {}

}
