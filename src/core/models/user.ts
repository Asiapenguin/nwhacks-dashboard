import { Resource } from './resource';

export class User extends Resource {
  static resourcePath = '/user';

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  password: string;
  created_at: Date;
}
