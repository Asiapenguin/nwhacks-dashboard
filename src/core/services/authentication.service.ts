import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

const ENDPOINT = '/authentication';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url: string;
  user: User;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.url = this.urlService.getEndpoint();
  }

  authenticate(username: string, password: string): Promise<User> {
    return new Promise((res, rej) => {
      this.http.post(this.url + ENDPOINT, {
        username: username,
        password: password
      }).subscribe((data: User) => {
        this.user = data;
        res(this.user);
      },
      error => {
        rej(error.statusText);
      })
    })
  }

}
