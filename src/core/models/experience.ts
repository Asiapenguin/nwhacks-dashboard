import { Resource } from './resource';

export class Experience extends Resource {
  static resourcePath = '/experience';

  id: number;
  city: string;
  country: string;
  title: string;
  description: string;
  votes: number;
}
