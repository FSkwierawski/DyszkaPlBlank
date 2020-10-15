import { IdentityService } from './../services/identity.service';
import { Router } from '@angular/router';
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
    private orderService: OrderService,
    private router: Router,
    private identityService: IdentityService) {
      this.orders$.subscribe(orders => {
        this.orders = orders['items'];
      });
    }

  orders$ = new BehaviorSubject<Order[]>([]);
  public orders: Order[];
  doneAble: boolean;
  title = '';

  ngOnInit() {
    this.getOrdered();
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
      this.doneAble = true;
      this.title = 'Zlecone';
    });
  }

  getToDo() {
    this.orderService.getOrdersForCurrentUserOffers(1, false).subscribe((orders: Order[]) => {
      this.orders$.next(orders);
      console.log(this.orders);
      this.doneAble = false;
      this.title = 'Realizowane';
    });
  }

  getDone() {
    this.orderService.getOrdersForCurrentUserOffers(1, true).subscribe((orders: Order[]) => {
      this.orders$.next(orders);
      console.log(this.orders);
      this.doneAble = false;
      this.title = 'Zrealizowane';
    });
  }

  setToDone(id: string) {
    this.orderService.markAsDone(id).subscribe(result => {
      console.log('order set to done');
      this.getOrdered();
    });
  }

  startChat(orderAuthorUsername: string, offerAuthorUsername: string) {
    let username = orderAuthorUsername;
    if (username === this.identityService.currentUser$.value) {
      username = offerAuthorUsername;
    }
    this.router.navigateByUrl(`message-screen/${username}`);
  }

  goToOfferDetails(id: string) {
    this.router.navigateByUrl(`offer-screen/${id}`);
  }
}
