import { Injectable, Injector } from '@angular/core';
import { Experience } from '../models/experience';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends ResourceService {
  constructor(injector: Injector) { 
    super(injector, Experience);
  }
}
