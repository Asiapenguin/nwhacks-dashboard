import { Routes } from '@angular/router';
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component';
import { LoginPageComponent } from 'src/app/pages/login-page/login-page.component';
import { SignUpPageComponent } from 'src/app/pages/sign-up-page/sign-up-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
    data: {
      title: 'Sign Up'
    }
  },
  {
    path: 'home',
    component: HomePageComponent,
    data: {
      title: 'Home'
    }
  }
];
