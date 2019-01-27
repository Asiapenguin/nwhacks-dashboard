import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { ListResponse } from './resource.service';

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

  getUser() {
    return this.user;
  }

  authenticate(username: string, password: string): Promise<User> {
    return new Promise((res, rej) => {
      this.http.post(this.url + ENDPOINT, {
        username: username,
        password: password
      }).subscribe((result: any) => {
        this.user = result.data;
        console.log("User: " + this.user);
        res(this.user);
      },
      error => {
        rej(error.statusText);
      })
    })
  }

}
