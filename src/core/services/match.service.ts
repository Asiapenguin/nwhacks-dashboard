import { Injectable, Injector } from '@angular/core';
import { Match } from '../models/match';
import { ResourceService } from './resource.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  users = [
    {
      id: 1,
      username: "kkoon",
      firstName: "Kelvin",
      lastName: "Koon",
      email: "example@live.ca",
      city: "Vancouver",
      country: "Canada",
      password: "1234",
      facebook: "https://facebook.com",
      created_at: Date.now()
    },
    {
      id: 2,
      username: "jerry",
      firstName: "Jerry",
      lastName: "Zhao",
      email: "example@live.ca",
      city: "Vancouver",
      country: "Canada",
      password: "1234",
      facebook: "https://facebook.com",
      created_at: Date.now()
    }
  ]
  constructor() {}

  // Needs more work
  findMatches(user: User) {
    // find users that favorited similar things and similar interests
    return this.users;
  }
}
