import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';


// import { UserService } from './user.service';
//
import { LazyLoadRoutingModule  }  from './lazy-load.routing.module';

import { LazyLoadComponents  }  from './lazy-load.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadRoutingModule,
    HttpModule
  ],
  declarations: [
    LazyLoadComponents
  ],
  providers: []
})
export class LazyLoadModule {}
