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
  @Output() login = new EventEmitter<LoginData>();
  @Input() autofocus = true; // should autofocus username field (default true)

  @ViewChild('usernameInput') usernameInput: ElementRef;
  loginData: LoginData = new LoginData();

  constructor(private router: Router) {}

  ngAfterViewInit() {
    if (this.autofocus) {
      this.usernameInput.nativeElement.focus();
    }
  }

  // Emit event to login output
  emitLoginData() {
    this.login.emit(this.sanitize(this.loginData));
    console.log("Username is: " + JSON.stringify(this.loginData));
    this.router.navigate(["/home"]);
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
