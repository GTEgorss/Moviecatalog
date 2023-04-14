import { UserDto } from './dto/user.dto';
import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class UserService {
  createUser(dto: UserDto) {
    throw new NotImplementedException();
  }

  getUserByUsername(username: string) {
    throw new NotImplementedException();
  }

  getUserByEmail(email: string) {
    throw new NotImplementedException();
  }

  getUserById(id: number): UserDto {
    throw new NotImplementedException();
  }

  deleteUserByUsername(username: string) {
    throw new NotImplementedException();
  }

  deleteUserByEmail(email: string) {
    throw new NotImplementedException();
  }

  deleteUserById(id: number): UserDto {
    throw new NotImplementedException();
  }
}
