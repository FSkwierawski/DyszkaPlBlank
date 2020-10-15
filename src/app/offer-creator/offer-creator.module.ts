import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferCreatorPageRoutingModule } from './offer-creator-routing.module';

import { OfferCreatorPage } from './offer-creator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferCreatorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OfferCreatorPage]
})
export class OfferCreatorPageModule {}
