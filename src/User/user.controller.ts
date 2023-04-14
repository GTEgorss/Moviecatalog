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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'create user' })
  @Post('create')
  async createUser(@Body() dto: UserDto): Promise<UserDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'get user by username' })
  @Get('get/username/:username')
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<UserDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'get user by email' })
  @Get('get/email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<UserDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'get user by id' })
  @Get('get/id/:id')
  async getUserById(@Param('id') id: number): Promise<UserDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'delete user by username' })
  @Delete('delete/username/:username')
  async deleteUserByUsername(@Param() username: string): Promise<UserDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'delete user by email' })
  @Delete('delete/email/:email')
  async deleteUserByEmail(@Param() email: string): Promise<UserDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: 'delete user by id' })
  @Delete('delete/id/:id')
  async deleteUserById(@Param() id: number): Promise<UserDto> {
    throw new NotImplementedException();
  }
}
