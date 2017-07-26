import { Component, OnInit, EventEmitter } from '@angular/core';

// import { Hero } from '../interfaces/hero';
import { Name } from '../../interfaces/name';

@Component({
	selector:'side-bar',
	templateUrl:'./side-bar.component.html',
  inputs:['user'],
  outputs:['childValueChanged']
})

export class SideBarComponent {

    //@Input() user;
  	private childValue: string;
  	private newName:string;
  	private names: Name[];

    childValueChanged = new EventEmitter<string>();

  	constructor() { 
      console.log('onChanges hook');
  	}

	 //on load function
	 ngOnInit(): void {
  		this.names = [];
	 }

   ngOnChanges():void{
      console.log('onChanges hook');
    }

   onChange(value:string):void{
      this.childValueChanged.emit(value);
   }

	 onSelect(name):void{
	   	console.log(name)
	 }

	 addNew(name):void{
      this.newName = '';
		  this.names.push({name:name});
	 }
}