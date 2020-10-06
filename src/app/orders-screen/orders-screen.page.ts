import { OrderService } from './../services/order.service';
import { BehaviorSubject } from 'rxjs';
import { Component, getDebugNode, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Order } from '../model/Order';

@Component({
  selector: 'app-orders-screen',
  templateUrl: './orders-screen.page.html',
  styleUrls: ['./orders-screen.page.scss'],
})
export class OrdersScreenPage implements OnInit {
  constructor(
    public actionSheetController: ActionSheetController,
    private orderService: OrderService) {
      this.orders$.subscribe(orders => {
        this.orders = orders['items'];
      });
    }

  orders$ = new BehaviorSubject<Order[]>([]);
  public orders: Order[];

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Kategorie ofert',
      cssClass: 'action-sheet',
      animated: true,
      buttons: [
        {
          text: 'Zlecone',
          icon: 'open-outline',
          handler: () => {
            this.getOrdered();
          }
        },
        {
          text: 'Realizowane',
          icon: 'cog-outline',
          handler: () => {
            this.getToDo();
          }
        },
        {
          text: 'Zrealizowane',
          icon: 'checkmark-done-outline',
          handler: () => {
            this.getDone();
          }
        },
      ],
    });
    await actionSheet.present();
  }

  getOrdered() {
    this.orderService.getCreatedByCurrentUser(1).subscribe((orders: Order[]) => {
      this.orders$.next(orders);
      console.log(this.orders);
    });
  }

  getToDo() {
    this.orderService.getOrdersForCurrentUserOffers(1, false).subscribe((orders: Order[]) => {
      this.orders$.next(orders);
      console.log(this.orders);
    });
  }

  getDone() {
    this.orderService.getOrdersForCurrentUserOffers(1, true).subscribe((orders: Order[]) => {
      this.orders$.next(orders);
      console.log(this.orders);
    });
  }

  setToDone() {
    this.orderService.markAsDone(id).subscribe
  }
}
