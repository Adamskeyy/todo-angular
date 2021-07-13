import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
      path: '',
      component: ProfileComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }
