import { Routes } from '@angular/router';
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component';
import { LoginPageComponent } from 'src/app/pages/login-page/login-page.component';
import { SignUpPageComponent } from 'src/app/pages/sign-up-page/sign-up-page.component';
import { CityPageComponent } from 'src/app/pages/city-page/city-page.component';
import { ExperienceNewPageComponent } from 'src/app/pages/experience-new-page/experience-new-page.component';
import { ProfilePageComponent } from 'src/app/pages/profile-page/profile-page.component';

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
  },
  {
    path: 'city',
    data: {
      title: 'Cities'
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full' 
      },
      {
        path: ':id',
        component: CityPageComponent
      }
    ]
  },
  {
    path: 'experience',
    data: {
      title: 'Experience'
    },
    children: [
      {
        path: '',
        redirectTo: 'home', // Change later
        pathMatch: 'full'
      },
      {
        path: 'new',
        component: ExperienceNewPageComponent,
        data: {
          title: 'Create New Component'
        }
      }
    ]
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    data: {
      title: 'Profile'
    }
  }
];
