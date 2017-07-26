import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { GameService } from './game.service'

@Component({
  selector: 'app-gamedetails',
  templateUrl: './gamedetails.component.html',
  styleUrls: ['./gamedetails.component.css']
})
export class GamedetailsComponent implements OnInit {

  private gameId:number;
  private sub:any;
  private hasGame:boolean = false;
  private selectedGame;
  private parentValue:string = 'Parent Value';
  private childValue:string = 'Chils Value';

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit() {
    //params observable sample
  	// this.sub = this.route.params.subscribe(params => {
    //   let id = +params['id']; // (+) converts string 'id' to a number
    //   this.gameId = id;
    //   this.getGame(this.gameId);
    // });

   //snapshot sample
   // let id = +this.route.snapshot.params['id'];
   // this.gameId = id;

   //fetch data from resolve
   this.route.data.subscribe(data=> {
     this.selectedGame = data.game;
     this.hasGame = true;
   });
  }

  goNext():void {
    let nextId = this.gameId + 1;
    this.router.navigate(['/games', nextId]);
  }

  goPrevious():void {
    let nextId = this.gameId - 1;
    this.router.navigate(['/games', nextId]);
  }

  //sample of optional route param
  goGameList():void {
      let selectedId = this.gameId ? this.gameId : null;
      this.router.navigate(['/games', { id: selectedId }]);
  }

  getGame(id:number): void {
      // this.gameService.getGameById(id)
      // .then(res => {
      //     this.selectedGame = res;
      //     this.hasGame = true;
      // },
      // error=>{
      // 	console.log(error);
      // });

      this.gameService.getGameById(id).subscribe(res => {
        this.selectedGame = res;
        this.hasGame = true;
      });
   }

  childEvent(value:string):void{
    this.childValue = value;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
