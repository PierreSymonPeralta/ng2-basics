import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-detail-child',
  templateUrl: './game-detail-child.component.html',
  styleUrls: ['./game-detail-child.component.css'],
  inputs:['selectedGame'],
  outputs:['childEvent']
})

export class GameDetailChildComponent implements OnInit {

  private selectedGame;
  private inputValue:string;
  private childEvent = new EventEmitter<string>();
  private gameTypes = [];
  private gameForm:FormGroup;

  constructor(
    private gameService: GameService,
    private fb: FormBuilder
   ) { }


  ngOnInit() {
    this.gameTypes = this.gameService.getGameType();

    //build form
    this.gameForm = this.fb.group({
      Name: ['Value', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      Description: [],
      ReleaseDate: [],
      Enabled: [],
      Summary: [],
      Type: [],
      other: this.fb.group({
        Gid: ['',Validators.required],
        RTP: []
      })
    });
    
    this.gameForm.setValue({
      Name: this.selectedGame.Name,
      Description: this.selectedGame.Description,
      ReleaseDate: this.selectedGame.ReleaseDate,
      Enabled: this.selectedGame.Enabled,
      Summary: this.selectedGame.Summary,
      Type: this.selectedGame.Type,
      other: {
        Gid: this.selectedGame.Gid,
        RTP: this.selectedGame.RTP
      }
    });
  }

  onChange(value:string):void{
    this.childEvent.emit(value)
  }

  onKey(event:any):void{
    this.inputValue = event.target.value;
  }

  //Template based Form
  onSubmitTemplateBased(gameValue:any){
    console.log(gameValue);
  }
  //Model based Form
  onSubmitModelBased(){
    console.log(this.gameForm.value);
  }
}
