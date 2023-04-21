import { Role } from './enums/role.enum';

export interface IUser {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: Role;
  favoriteIds: number[]; // movie IDs
}
