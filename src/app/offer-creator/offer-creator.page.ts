import { AlertController } from '@ionic/angular';
import { Helpers } from './../common/helpers';
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
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    price: new FormControl('', [Validators.required, Validators.min(10)]),
    tags: new FormControl('', [Validators.required, Validators.pattern(Helpers.tagsPattern)]),
    shortDescription: new FormControl('', [Validators.required, Validators.maxLength(160)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(1000)])
  });

  constructor(
    private formModule: FormsModule,
    private offerservice: OfferService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.offerCreator.valid) {
      this.addingOfferAlert();
    }
    else {

    }
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

  async addingOfferAlert() {
    const alert = await this.alertController.create({
      header: 'Uwaga!',
      subHeader: 'Czy na pewno chcesz dodać ofertę?',
      message: 'Raz dodanej oferty nie można edytować',
      buttons: [
        {
          text: 'Tak',
          handler: () => {
            this.offerservice.addOffer(this.createOfferfromForm());
          }
        },
        {
          text: 'Nie',
        }
      ]
    });
    await alert.present();
  }

  async validationAlert() {
    const alert = await this.alertController.create({
      header: 'Uwaga!',
      subHeader: 'wproawdzone dane oferty są niepoprawne',
      message: 'Wszystkie dane muszą być podane, tagi wpisywać po przecinku bez spacji, cena oferty conajmniej 10zł',
      buttons: [
        {
          text: 'Ok',
        },
      ]
    });
    await alert.present();
  }
}
