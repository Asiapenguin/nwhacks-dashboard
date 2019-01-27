import { Resource } from './resource';

export class City extends Resource {
  static resourcePath = '/city';

  id: number;
  name: string;
  country: string;
}
