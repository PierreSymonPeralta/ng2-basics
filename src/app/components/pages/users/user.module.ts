import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';


import { UserService } from './user.service';

import { UserRoutingModule  }  from './user.routing.module';

import { userComponents  }  from './user.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    HttpModule
  ],
  declarations: [
    userComponents
  ],
  providers: [ UserService ]
})
export class UserModule {}
