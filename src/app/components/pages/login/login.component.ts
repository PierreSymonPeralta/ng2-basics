import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;
  constructor(private service:AuthService, private router:Router) {
     this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.service.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';
    this.service.login().subscribe(() => {
      this.setMessage();
      if (this.service.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.service.redirectUrl ? this.service.redirectUrl : '/lazy';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }
  logout() {
    this.service.logout();
    this.setMessage();
  }
}
