import { Component, OnInit, AfterContentChecked  } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  private pageNumber:number = 1;
  private userLength:number;
  private totalPage:number;
  private page:number;
  private perPage:number = 3;
  private requestParams:any;

  alertMessage:string;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  ngDestroy(){
    console.log('ngDestroy');
  }

  private getUsers(){
    this.requestParams = {
      'page':this.pageNumber,
      'per_page':this.perPage
    }

    this.userService.getUsers(this.requestParams)
                    .subscribe(users => {
                      this.users = users.data;
                      this.totalPage = users.total_pages;
                      this.page = users.page;
                    });
  }

  private nextPage(){
    if (this.page < this.totalPage) {
      this.pageNumber += 1;
      this.getUsers();
    } else {

    }
  }

  private previousPage(){
    if(this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.getUsers();
    }
  }

  private changeNumberOfUsers() {
    this.pageNumber = 1;
    this.getUsers();
  }




}
