import { Injectable } from '@angular/core';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  cities = [
    {
      id: 1,
      name: "Vancouver",
      country: "Canada"
    },
    {
      id: 2,
      name: "Calgary",
      country: "Canada"
    }
  ];

  constructor() { }

  get() {
    return new Promise((resolve, reject) => {
      resolve(this.cities);
    });
  }
}
