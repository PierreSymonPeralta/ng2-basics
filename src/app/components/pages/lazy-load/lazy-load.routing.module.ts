import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LazyLoadComponent }    from './lazy-load.component';

const userRoutes: Routes = [
  {
    path: '',
    component: LazyLoadComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LazyLoadRoutingModule { }

export const LazyLoadComponents = [LazyLoadComponent];
