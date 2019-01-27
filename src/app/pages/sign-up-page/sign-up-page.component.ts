import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/core/services/alert.service';
import { UserService } from 'src/core/services/user.service';
import { User } from 'src/core/models/user';
import { RouteService } from 'src/core/services/route.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements AfterViewInit {
  @Input() autofocus = true; // should autofocus username field (default true)

  @ViewChild('usernameInput') usernameInput: ElementRef;
  user: User = new User();

  constructor(private routeService: RouteService, private alertService: AlertService, private userService: UserService) {}

  ngAfterViewInit() {
    if (this.autofocus) {
      this.usernameInput.nativeElement.focus();
    }
  }

  // Emit event to login output
  create() {
    this.user = this.sanitize(this.user);
    console.log("Sign-up data is: " + JSON.stringify(this.user));
    this.userService.create(this.user).then((result) => {
      console.log("Sign-up: " + result);
      this.routeService.goLoginPage();
      this.alertService.success("Sign up successful");
    },
    (error) => {
      this.alertService.error("Sign up error: " + error);
    });
  }

  // Sanitize input
  private sanitize(user: User): User {
    const username = user.username;
    user.username = username.replace(/[^0-9a-zA-Z@_]/g, '');

    let password = user.password;
    password = password.trim();
    user.password = password;
    
    return user;
  }
}
