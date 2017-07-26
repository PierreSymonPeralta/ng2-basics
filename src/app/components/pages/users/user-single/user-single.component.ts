import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit {

  private obs:any;
  private user:User;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:UserService
  ) { }

  ngOnInit() {
    this.obs = this.route.params.subscribe(value => {
      let id = value.id;
      this.service.getUser(id)
                  .subscribe(user => this.user = user);
    });
  }

  private deleteUser() {
    this.service.deleteUser(this.user.id)
        .subscribe(data=>{
          console.log('User Deleted');

          this.router.navigate(['/users']);
        });
  }

}
