import { IdentityService } from './../services/identity.service';
import { Config } from './../Config';
import { Router } from '@angular/router';
import { PagedResult } from './../model/Paged-result';
import { OfferService } from './../services/offer.service';
import { Offer } from './../model/Offer';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, AlertController } from '@ionic/angular';



@Component({
  selector: 'app-offer-screen',
  templateUrl: './offer-screen.page.html',
  styleUrls: ['./offer-screen.page.scss'],
})
export class OfferScreenPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  // public offers$ = new BehaviorSubject<Offer[]>([]);
  public offers = [];
  public currentOfferPage: number;
  public maxOfferPage: number;
  public tags: string;
  public isPromoted = false;


  constructor(
    private http: HttpClient,
    private offersrvice: OfferService,
    private router: Router,
    private alertController: AlertController,
    private identityService: IdentityService) {
    this.loadData(1);
  }

  ngOnInit() {
    if (this.identityService.user$.value.isBanned === true) {
      this.presentBanAlert();
    }
  }

  loadData(page: number) {
    this.offersrvice.getPaged(page).subscribe((offers: PagedResult<Offer>)  => {
      this.offers = this.offers.concat(offers.items);
      this.currentOfferPage = offers.currentPage;
      this.maxOfferPage = offers.pagesCount;
      console.log(this.offers);
    });

    // this.http.get('https://reqres.in/api/users?page=2').subscribe(res => {
    //   console.log(res);
    //   this.offers = this.offers.concat(res['data']);
    // });
  }

  loadOffers(event) {
    if (this.currentOfferPage < this.maxOfferPage)  {
    console.log(event);
    this.loadData(this.currentOfferPage + 1);
    event.target.complete();
    }
    else{
      event.target.complete();
    }
  }
  openOfferDetails(offer: Offer) {
    this.router.navigateByUrl(`offer-screen/${offer.id}`);
  }

  openOfferCreator() {
    this.router.navigateByUrl('offer-creator');
  }

  getPagedByTags() {
    this.isPromoted = false;
    let tagArray = this.tags.split(',');
    this.offersrvice.getPaged(1, null, tagArray).subscribe((offers: PagedResult<Offer>)  => {
      let tempOffers = (offers.items);
      if (tempOffers.filter(o => o.id === tempOffers[0].id).length > 1) {
        let indexToCut = tempOffers.indexOf(tempOffers.filter(o => o.id === tempOffers[0].id)[1]);
        tempOffers.splice(indexToCut, 1);
        this.isPromoted = true;
      }
      this.offers = tempOffers;
      this.currentOfferPage = offers.currentPage;
      this.maxOfferPage = offers.pagesCount;
      console.log(this.offers);
    });
    if (tagArray[0] === '') {
      this.loadData(1);
    }
  }

  async presentBanAlert() {
    const alert = await this.alertController.create({
      header: 'Uwaga!',
      message: 'Użytkownik jest zbanowany',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.identityService.logout();
          }
        }
      ]
    });
    await alert.present();
  }

}
