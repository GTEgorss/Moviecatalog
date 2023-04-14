export class UserDto {
  username: string;
  password: string;
  fullName: string;
  email: string;
  favorites: number[]; // movie IDs, TODO better way?
}
