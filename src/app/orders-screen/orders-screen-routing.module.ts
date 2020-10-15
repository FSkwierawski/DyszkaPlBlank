import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersScreenPage } from './orders-screen.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersScreenPageRoutingModule {}
