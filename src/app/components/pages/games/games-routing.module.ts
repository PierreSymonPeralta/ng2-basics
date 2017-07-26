import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent }    from './game.component';
import { GamedetailsComponent }  from './gamedetails.component';

import { GameResolve } from './resolvers/game.resolver';

import { GameByIdResolve } from './resolvers/gamebyid.resolver';


const gameRoutes: Routes = [
  {
  	path: '',
  	component: GameComponent,
  	resolve:{
  		games:GameResolve
  	}
  },
  {
    path: ':id',
    component: GamedetailsComponent,
    resolve:{
      game:GameByIdResolve
    }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(gameRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers:[GameResolve, GameByIdResolve]
})
export class GameRoutingModule { }

export const gameComponents = [GameComponent, GamedetailsComponent];
