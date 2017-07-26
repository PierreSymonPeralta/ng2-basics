import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent }    from './users.component';
import { UserListComponent }  from './user-list/user-list.component';
import { UserSingleComponent } from './user-single/user-single.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';

import { AuthGuard } from '../../../service/auth-guard.service';
import { CanDeactivateGuard } from '../../../service/can-deactive-guard.service';

const userRoutes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: UsersComponent,
    children:[
      {
        path:'',
        component:UserListComponent
      },
      {
        path: 'create',
        component: UserCreateComponent,
        canDeactivate:[CanDeactivateGuard]
      },
      {
        path:':id',
        component:UserSingleComponent
      },
      {
        path:':id/edit',
        component:UserEditComponent
      }
    ]
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
export class UserRoutingModule { }

export const userComponents = [UsersComponent, UserListComponent, UserSingleComponent, UserEditComponent, UserCreateComponent];
