import { Resource } from './resource';

export class User extends Resource {
  static resourcePath = '/user';

  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  city: string;
  country: string;
  password: string;
  facebook: string;
  created_at: Date;
}
