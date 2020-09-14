import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferScreenPage } from './offer-screen.page';

const routes: Routes = [
  {
    path: '',
    component: OfferScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferScreenPageRoutingModule {}
