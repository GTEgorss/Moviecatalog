import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoriteDto } from './dto/favorite.dto';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('create')
  async createUser(@Body() dto: UserDto): Promise<UserDto> {
    return this.userService.createUser(dto);
  }

  @ApiOperation({ summary: 'get user by username' })
  @ApiResponse({ status: 200, description: 'User provided successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get('username/:username')
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<UserDto> {
    return this.userService.getUserByUsername(username);
  }

  @ApiOperation({ summary: 'get user by email' })
  @ApiResponse({ status: 200, description: 'User provided successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<UserDto> {
    return this.userService.getUserByEmail(email);
  }

  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({ status: 200, description: 'User provided successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get('id/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'delete user by username' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete('username/:username')
  async deleteUserByUsername(
    @Param('username') username: string,
  ): Promise<UserDto> {
    return this.userService.deleteUserByUsername(username);
  }

  @ApiOperation({ summary: 'delete user by email' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete('email/:email')
  async deleteUserByEmail(@Param('email') email: string): Promise<UserDto> {
    return this.userService.deleteUserByEmail(email);
  }

  @ApiOperation({ summary: 'delete user by id' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete('id/:id')
  async deleteUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserDto> {
    return this.userService.deleteUserById(id);
  }

  @ApiOperation({ summary: 'add movie to favorites' })
  @ApiResponse({ status: 200, description: 'Movie added successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('favorites/:userId/:movieId')
  async addFavorite(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ): Promise<FavoriteDto> {
    return this.userService.addFavorite(userId, movieId);
  }

  @ApiOperation({ summary: 'get favorites' })
  @ApiResponse({ status: 200, description: 'Movie removed successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('favorites/:userId')
  async getFavorites(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<FavoriteDto[]> {
    return this.userService.getFavorites(userId);
  }

  @ApiOperation({ summary: 'remove movie to favorites' })
  @ApiResponse({ status: 200, description: 'Movie removed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete('favorites/:userId/:movieId')
  async removeFavorite(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    return this.userService.removeFavorite(userId, movieId);
  }
}
