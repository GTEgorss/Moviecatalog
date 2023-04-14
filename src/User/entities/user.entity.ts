export class User implements IUser {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: Role;
}