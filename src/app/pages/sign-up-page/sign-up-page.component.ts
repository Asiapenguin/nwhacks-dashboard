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

export class SignUpData {
  public username: string;
  public password: string;
  public email: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements AfterViewInit {
  @Output() login = new EventEmitter<SignUpData>();
  @Input() autofocus = true; // should autofocus username field (default true)

  @ViewChild('usernameInput') usernameInput: ElementRef;
  signUpData: SignUpData = new SignUpData();

  constructor(private router: Router) {}

  ngAfterViewInit() {
    if (this.autofocus) {
      this.usernameInput.nativeElement.focus();
    }
  }

  // Emit event to login output
  emitSignUpData() {
    this.login.emit(this.sanitize(this.signUpData));
    console.log("Sign-up data is: " + JSON.stringify(this.signUpData));
  }

  // Sanitize input
  private sanitize(signUpData: SignUpData): SignUpData {
    const username = signUpData.username;
    signUpData.username = username.replace(/[^0-9a-zA-Z@_]/g, '');

    let password = signUpData.password;
    password = password.trim();
    signUpData.password = password;
    
    return signUpData;
  }
}
