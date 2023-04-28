import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'GTEgorss' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'asdlkamsdlkamsldmaldm' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Sergeev Egor' })
  fullName: string | null;

  @ApiProperty({ example: 'noartu@gmail.com' })
  @IsEmail()
  email: string;
  role: Role = Role.USER;
}
