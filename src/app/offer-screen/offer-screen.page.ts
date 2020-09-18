import { Config } from './../Config';
import { Router } from '@angular/router';
import { PagedResult } from './../model/Paged-result';
import { OfferService } from './../services/offer.service';
import { Offer } from './../model/Offer';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';



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


  constructor(
    private http: HttpClient,
    private offersrvice: OfferService,
    private router: Router) {
    this.loadData(1);
  }

  ngOnInit() {

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

}
