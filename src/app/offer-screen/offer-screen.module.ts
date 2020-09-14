import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferScreenPageRoutingModule } from './offer-screen-routing.module';

import { OfferScreenPage } from './offer-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferScreenPageRoutingModule
  ],
  declarations: [OfferScreenPage]
})
export class OfferScreenPageModule {}
