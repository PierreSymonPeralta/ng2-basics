import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { gameComponents }  from './games-routing.module';
import { GameService } from './game.service';

import { GameRoutingModule  }  from './games-routing.module';
import { GameDetailChildComponent } from './game-detail-child/game-detail-child.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GameRoutingModule
  ],
  declarations: [
    gameComponents,
    GameDetailChildComponent
  ],
  providers: [ GameService ]
})
export class GameModule {}
