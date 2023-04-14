import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() dto: UserDto): Promise<UserDto> {
    throw new NotImplementedException();
  }

  @Get('get/username/:username')
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<UserDto> {
    throw new NotImplementedException();
  }

  @Get('get/email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<UserDto> {
    throw new NotImplementedException();
  }

  @Get('get/id/:id')
  async getUserById(@Param('id') id: number): Promise<UserDto> {
    throw new NotImplementedException();
  }

  @Delete('delete/username/:username')
  async deleteUserByUsername(@Param() username: string): Promise<UserDto> {
    throw new NotImplementedException();
  }

  @Delete('delete/email/:email')
  async deleteUserByEmail(@Param() email: string): Promise<UserDto> {
    throw new NotImplementedException();
  }

  @Delete('delete/id/:id')
  async deleteUserById(@Param() id: number): Promise<UserDto> {
    throw new NotImplementedException();
  }
}
