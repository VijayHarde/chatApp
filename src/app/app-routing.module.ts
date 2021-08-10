import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';


// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/']);
 
// Automatically log in users
const redirectLoggedInToChat = () => redirectLoggedInTo(['/users-info']);

const routes: Routes = [
  {
    path: 'home',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToChat),
  },
  {
    path: 'users-info',
    loadChildren: () => import('./users-info/users-info.module').then( m => m.UsersInfoPageModule)
  },
  // {
  //   path: 'user-touser-chat',
  //   loadChildren: () => import('./user-to-user-chat/user-to-user-chat.module').then( m => m.UserToUserChatPageModule)
  // },
  // {
  //   path: 'user-to-user-chat',
  //   loadChildren: () => import('./user-to-user-chat/user-to-user-chat.module').then( m => m.UserToUserChatPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
