import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GameService } from '../game.service';

@Injectable()

export class GameByIdResolve implements Resolve<any> {

  constructor(private service:GameService){}

  resolve(route:ActivatedRouteSnapshot){

    let id = route.params['id'];
    return this.service.getGameById(id);
    
  }
}
