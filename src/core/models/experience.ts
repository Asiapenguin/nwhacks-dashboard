import { Resource } from './resource';
import { City } from './city';

export class Experience extends Resource {
  static resourcePath = '/experience';

  id: number;
  user_id: number;
  city: City;
  description: string;
}
