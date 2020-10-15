import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferCreatorPage } from './offer-creator.page';

const routes: Routes = [
  {
    path: '',
    component: OfferCreatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferCreatorPageRoutingModule {}
