import { HttpClient } from '@angular/common/http';
import { Offer } from './../interfaces/Offer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';



@Component({
  selector: 'app-offer-screen',
  templateUrl: './offer-screen.page.html',
  styleUrls: ['./offer-screen.page.scss'],
})
export class OfferScreenPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  offers = [];

  constructor(private http: HttpClient) {
    this.loadData();
    this.loadData();
    this.loadData();
  }

  ngOnInit() {

  }

  loadData() {
    this.http.get('https://reqres.in/api/users?page=2').subscribe(res => {
      console.log(res);
      this.offers = this.offers.concat(res['data']);
    });
  }

  loadOffers(event) {
    console.log(event);
    this.loadData();
    event.target.complete();
    }

}
