import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GameService } from '../game.service';

@Injectable()

export class GameResolve implements Resolve<any> {

  constructor(private service:GameService){}

  resolve(route:ActivatedRouteSnapshot){
    return  this.service.getGames();
  }
}
