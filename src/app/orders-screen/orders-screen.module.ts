import { OrderService } from './../services/order.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersScreenPageRoutingModule } from './orders-screen-routing.module';

import { OrdersScreenPage } from './orders-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersScreenPageRoutingModule
  ],
  providers: [OrderService],
  declarations: [OrdersScreenPage]
})
export class OrdersScreenPageModule {}
