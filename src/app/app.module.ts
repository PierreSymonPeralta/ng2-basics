import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


//Route
import { AppRoutingModule } from './routes/app-routing.module';

import { AuthGuard } from './service/auth-guard.service';
import { CanDeactivateGuard } from './service/can-deactive-guard.service';
import { AuthService } from './service/auth.service';

//General
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SideBarComponent } from './components/sidebar/side-bar.component';

//Pages
import { routingComponents } from './routes/app-routing.module';
import { LoginComponent } from './components/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SideBarComponent,
    routingComponents,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, CanDeactivateGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
