import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterScreenPage } from './register-screen.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterScreenPageRoutingModule {}
