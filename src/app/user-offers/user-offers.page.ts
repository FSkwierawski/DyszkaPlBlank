import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from './../services/offer.service';
import { Component, OnInit } from '@angular/core';
import { PagedResult } from '../model/Paged-result';
import { Offer } from '../model/Offer';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.page.html',
  styleUrls: ['./user-offers.page.scss'],
})
export class UserOffersPage implements OnInit {

  public offers = [];
  public currentOfferPage: number;
  public maxOfferPage: number;
  public tags: string;

  constructor(
    private offerservice: OfferService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData(1);
  }

  loadData(page: number) {
    const username = this.activatedroute.snapshot.paramMap.get('id');
    this.offerservice.getPaged(page, username).subscribe((offers: PagedResult<Offer>)  => {
      this.offers = this.offers.concat(offers.items);
      this.currentOfferPage = offers.currentPage;
      this.maxOfferPage = offers.pagesCount;
      console.log(this.offers);
    });
}
openOfferDetails(offer: Offer) {
  this.router.navigateByUrl(`offer-screen/${offer.id}`);
}


}
