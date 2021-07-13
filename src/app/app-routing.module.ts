import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppCustomPreloader, AuthGuard } from '@app/shared/helpers';

export const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    data: { preload: true },
  },
  { path: '**', redirectTo: 'profile' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { preloadingStrategy: AppCustomPreloader })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
