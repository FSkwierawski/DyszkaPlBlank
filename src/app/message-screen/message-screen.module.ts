import { ChatComponent } from './chat/chat.component';
import { MessageService } from './../services/message.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageScreenPageRoutingModule } from './message-screen-routing.module';

import { MessageScreenPage } from './message-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageScreenPageRoutingModule
  ],
  providers: [MessageService],
  declarations: [MessageScreenPage, ChatComponent]
})
export class MessageScreenPageModule {}
