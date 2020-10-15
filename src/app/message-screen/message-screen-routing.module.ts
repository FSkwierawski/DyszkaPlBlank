import { ChatComponent } from './chat/chat.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageScreenPage } from './message-screen.page';

const routes: Routes = [
  {
    path: '',
    component: MessageScreenPage
  },
  {
    path: ':id',
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageScreenPageRoutingModule {}
