import { BehaviorSubject } from 'rxjs';
import { Offer } from './../../model/Offer';
import { OfferService } from './../../services/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {

  public offerDetails$ = new BehaviorSubject<Offer[]>([]);
  public offerDetails: Offer;


  constructor(
    private router: Router,
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.offerService.getById(id).subscribe((offerDetails: Offer[]) => {
      this.offerDetails$.next(offerDetails);
    });
  }

}
