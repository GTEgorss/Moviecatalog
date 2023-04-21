import { UserDto } from './dto/user.dto';
import prisma from '../main';
import { BadRequestException } from '@nestjs/common';

export class UserValidator {
  async validate(dto: UserDto) {
    if (
      Number(
        await prisma.user.count({
          where: {
            username: dto.username,
          },
        }),
      ) != 0
    ) {
      throw new BadRequestException('User with such username already exists');
    }

    if (
      Number(
        await prisma.user.count({
          where: {
            email: dto.email,
          },
        }),
      ) != 0
    ) {
      throw new BadRequestException('User with such email already exists');
    }
  }
}
