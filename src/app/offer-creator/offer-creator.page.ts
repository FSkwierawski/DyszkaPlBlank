import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-offer-creator',
  templateUrl: './offer-creator.page.html',
  styleUrls: ['./offer-creator.page.scss'],
})
export class OfferCreatorPage implements OnInit {

  offerCreator = new FormGroup({
    image: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    shortDescription: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private formModule: FormsModule) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.offerCreator.controls['title'].value);
  }

}
