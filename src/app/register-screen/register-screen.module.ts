import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterScreenPageRoutingModule } from './register-screen-routing.module';

import { RegisterScreenPage } from './register-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterScreenPageRoutingModule
  ],
  declarations: [RegisterScreenPage]
})
export class RegisterScreenPageModule {}
