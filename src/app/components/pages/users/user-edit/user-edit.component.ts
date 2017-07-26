import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  private userForm:FormGroup;
  private obs:any;
  private user:User;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private service:UserService,
    private route:ActivatedRoute,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    //get user
    this.obs = this.route.params.subscribe(value => {
      let id = value.id;
      this.service.getUser(id)
                  .subscribe(user => {
                    this.updateUserForm(user);
                    //this.user = user
                  },
                  error=>{
                    this.errorMessage = error;
                  });
    });
    this.userForm = this.fb.group({
          id:[],
          name:[],
          username:[],
          avatar:[]
    });
  }

  private updateUserForm(user:User) {
    this.userForm.setValue({
          id:user.id,
          name:user.name,
          username:user.username,
          avatar:user.avatar
    });
  }

  private updateUser(){
    this.service.updateUser(this.userForm.value)
        .subscribe(
          user=>{
            this.successMessage = 'User was updated.';
            console.log('user was updated')
          },
          error=>{
            this.errorMessage = error;
            console.log(error);
          },

          ()=>console.log('Observable completed')
        );
  }

}
