import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { UserProfilePage } from './user-profile.page';

const routes: Routes = [
  {
    path: ':id',
    component: UserProfilePage
  },
  {
    path: '/edit-profile',
    component: EditProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfilePageRoutingModule {}
