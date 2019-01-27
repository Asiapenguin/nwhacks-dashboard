import { Resource } from './resource';
import { User } from './user';

export class Match extends Resource {
  static resourcePath = '/match';

  id: number;
  users: Array<User>;
}
