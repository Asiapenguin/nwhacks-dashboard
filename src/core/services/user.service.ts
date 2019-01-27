import { Injectable, Injector } from '@angular/core';
import { ResourceService } from './resource.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService{

  constructor(injector: Injector) {
    super(injector, User);
  }
}
