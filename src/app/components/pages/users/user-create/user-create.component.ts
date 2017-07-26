import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  private userForm:FormGroup;
  private successMessage:string;
  private errorMessage:string;

  constructor(
    private service:UserService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      id:[],
      name:['',Validators.required],
      username:['',Validators.required],
      avatar:['',Validators.required]
    });
  }

  private createUser(){
    this.service.createUser(this.userForm.value)
        .subscribe(user=> {
          this.router.navigate(['/users']);
        },
        error=>console.log('Failed to Create new user'));
  }

  private canDeactivate(){
    console.log('navigating away!!!');
    if(!this.userForm.pristine){
       return window.confirm('Discard Changes?');
    }
    return true;
  }
}
