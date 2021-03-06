import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';

// import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: UserService) { }

  ngOnInit() {
    // user has been created
    this.service.userCreated$.subscribe(user => {
      this.successMessage = `${user.name} has been created!`;
      this.clearMessages();
    });

    // user has been deleted
    this.service.userDeleted$.subscribe(() => {
      this.successMessage = `The user has been deleted!`;
      this.clearMessages();
    });
  }
  /**
   * Clear all messages after 5 seconds
   */
 clearMessages() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage   = '';
    }, 5000);
  }
}
