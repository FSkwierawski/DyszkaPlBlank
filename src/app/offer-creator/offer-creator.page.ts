import { OfferService } from './../services/offer.service';
import { Offer } from './../model/Offer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-offer-creator',
  templateUrl: './offer-creator.page.html',
  styleUrls: ['./offer-creator.page.scss'],
})
export class OfferCreatorPage implements OnInit {

  private selectedImage = '';
  offer: Offer;

  offerCreator = new FormGroup({
    image: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    shortDescription: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(
    private formModule: FormsModule,
    private offerservice: OfferService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.offerservice.addOffer(this.createOfferfromForm());
    
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
  createOfferfromForm() {
    var data = this.offerCreator.getRawValue();
    data.image = this.selectedImage;
    data.tags = data.tags.split(',');
    return data;
  }
}
