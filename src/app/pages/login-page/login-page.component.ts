import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { RouteService } from 'src/core/services/route.service';

export class LoginData {
  public username: string;
  public password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements AfterViewInit {
  @Input() autofocus = true; // should autofocus username field (default true)

  @ViewChild('usernameInput') usernameInput: ElementRef;
  loginData: LoginData = new LoginData();
  loginError: string;

  constructor(private routeService: RouteService, private authenticationService: AuthenticationService) { }

  ngAfterViewInit() {
    if (this.autofocus) {
      this.usernameInput.nativeElement.focus();
    }
  }

  // Emit event to login output
  doLogin() {
    this.loginData = this.sanitize(this.loginData);
    let username = this.loginData.username;
    let password = this.loginData.password;
    this.authenticationService
      .authenticate(username, password)
      .then(user => {
        console.log(user);
        this.routeService.goHomePage();
      },
      (error) => {
        if (typeof error == 'string') {
          this.loginError = error;
        }
      });
  }

  // Sanitize input
  private sanitize(loginData: LoginData): LoginData {
    const username = loginData.username;
    loginData.username = username.replace(/[^0-9a-zA-Z@_]/g, '');

    let password = loginData.password;
    password = password.trim();
    loginData.password = password;

    return loginData;
  }
}
