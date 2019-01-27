import { Injectable, Injector } from '@angular/core';
import { City } from '../models/city';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class CityService extends ResourceService {
  constructor(injector: Injector) {
    super(injector, City);
  }
}
