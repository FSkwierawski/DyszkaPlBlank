import { LoginScreenPage } from './login-screen/login-screen.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login-screen',
    pathMatch: 'full'
  },
  {
    path: 'login-screen',
    loadChildren: () => import('./login-screen/login-screen.module').then( m => m.LoginScreenPageModule)
  },
  {
    path: 'register-screen', // loadChildren: './register-screen/register-screen.module#RegisterScreenPageModule'
    loadChildren: () => import('./register-screen/register-screen.module').then( m => m.RegisterScreenPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'offer-screen',
    loadChildren: () => import('./offer-screen/offer-screen.module').then( m => m.OfferScreenPageModule)
  },
  {
    path: 'offer-creator',
    loadChildren: () => import('./offer-creator/offer-creator.module').then( m => m.OfferCreatorPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'user-offers',
    loadChildren: () => import('./user-offers/user-offers.module').then( m => m.UserOffersPageModule)
  },
  {
    path: 'message-screen',
    loadChildren: () => import('./message-screen/message-screen.module').then( m => m.MessageScreenPageModule)
  },
  {
    path: 'orders-screen',
    loadChildren: () => import('./orders-screen/orders-screen.module').then( m => m.OrdersScreenPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginScreenPage];
