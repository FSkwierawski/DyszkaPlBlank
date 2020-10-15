import { PayPal } from '@ionic-native/paypal/ngx';
import { CommentService } from './../services/comment.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferScreenPageRoutingModule } from './offer-screen-routing.module';

import { OfferScreenPage } from './offer-screen.page';
import { OfferComponent } from './offer/offer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferScreenPageRoutingModule
  ],
  providers: [CommentService, PayPal],
  declarations: [OfferScreenPage, OfferComponent]
})
export class OfferScreenPageModule {}
