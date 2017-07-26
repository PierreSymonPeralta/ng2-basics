import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../components/pages/home/home.component';
import { AboutComponent } from '../components/pages/about/about.component';
import { LoginComponent } from '../components/pages/login/login.component';

import { PageNotFoundComponent } from '../components/pages/page-not-found/page-not-found.component';

import { AuthGuard } from '../service/auth-guard.service';

const routes : Routes  = [
		{
		  path: '',
		  redirectTo: '/home',
		  pathMatch: 'full'
		},
		{
			path: 'home',
			component: HomeComponent,
			data:{ title: 'Home Page'}
		},
		{
			path: 'about',
			component: AboutComponent
		},
		{
			path: 'login',
			component: LoginComponent
		},
		{
			path: 'lazy',
			loadChildren: 'app/components/pages/lazy-load/lazy-load.module#LazyLoadModule'
		},
		{
			path: 'users',
			canActivate: [AuthGuard],
			loadChildren: 'app/components/pages/users/user.module#UserModule'
		},
		{
			path: 'games',
			loadChildren: 'app/components/pages/games/game.module#GameModule'
		},
		{
			path: '**',
			component: PageNotFoundComponent
		}
	];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

export const routingComponents = [ HomeComponent, AboutComponent, PageNotFoundComponent];
