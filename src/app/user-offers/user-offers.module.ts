import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserOffersPageRoutingModule } from './user-offers-routing.module';

import { UserOffersPage } from './user-offers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserOffersPageRoutingModule
  ],
  declarations: [UserOffersPage]
})
export class UserOffersPageModule {}
