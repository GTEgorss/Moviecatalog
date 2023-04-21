import { Role } from '../enums/role.enum';
import { IUser } from '../user.interface';

export class User implements IUser {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: Role;
  favoriteIds: number[]; // movie IDs
  // favoriteNames: string[]; // TODO decide later
}
