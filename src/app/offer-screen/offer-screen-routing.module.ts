
import { OfferComponent } from './offer/offer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferScreenPage } from './offer-screen.page';

const routes: Routes = [
  {
    path: '',
    component: OfferScreenPage
  },
  {
    path: ':id',
    component: OfferComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferScreenPageRoutingModule {}
