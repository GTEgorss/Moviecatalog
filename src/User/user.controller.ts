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
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { FavoriteDto } from './dto/favorite.dto';
import { PlaylistDto } from '../Playlist/dto/playlist.dto';
import { FavoriteTitleDto } from './dto/favorite-title.dto';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'create user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: { $ref: getSchemaPath(UserDto) },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('create')
  async createUser(@Body() dto: UserDto): Promise<UserDto> {
    return this.userService.createUser(dto);
  }

  @ApiOperation({ summary: 'get user by username' })
  @ApiResponse({
    status: 200,
    description: 'User provided successfully',
    type: UserDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get('username/:username')
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<UserDto> {
    return this.userService.getUserByUsername(username);
  }

  @ApiOperation({ summary: 'get user by email' })
  @ApiResponse({
    status: 200,
    description: 'User provided successfully',
    type: UserDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<UserDto> {
    return this.userService.getUserByEmail(email);
  }

  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({
    status: 200,
    description: 'User provided successfully',
    type: UserDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get('id/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'delete user by username' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: UserDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete('username/:username')
  async deleteUserByUsername(
    @Param('username') username: string,
  ): Promise<UserDto> {
    return this.userService.deleteUserByUsername(username);
  }

  @ApiOperation({ summary: 'delete user by email' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: UserDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete('email/:email')
  async deleteUserByEmail(@Param('email') email: string): Promise<UserDto> {
    return this.userService.deleteUserByEmail(email);
  }

  @ApiOperation({ summary: 'delete user by id' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: UserDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete('id/:id')
  async deleteUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserDto> {
    return this.userService.deleteUserById(id);
  }

  @ApiOperation({ summary: 'add movie to favorites by user id' })
  @ApiResponse({
    status: 200,
    description: 'Movie added successfully',
    schema: { $ref: getSchemaPath(FavoriteTitleDto) },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('favorites/id/:userId/:movieId')
  async addFavoriteByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ): Promise<FavoriteDto> {
    return this.userService.addFavoriteById(userId, movieId);
  }

  @ApiOperation({ summary: 'add movie to favorites by username' })
  @ApiResponse({
    status: 200,
    description: 'Movie added successfully',
    schema: { $ref: getSchemaPath(FavoriteTitleDto) },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('favorites/username/:username/:movieId')
  async addFavoriteByUsername(
    @Param('username') username: string,
    @Param('movieId', ParseIntPipe) movieId: number,
  ): Promise<FavoriteDto> {
    return this.userService.addFavoriteByUsername(username, movieId);
  }

  @ApiOperation({ summary: 'get favorites by id' })
  @ApiResponse({
    status: 200,
    description: 'Favorites provided successfully',
    type: FavoriteTitleDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('favorites/id/:userId')
  async getFavoritesByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<FavoriteTitleDto[]> {
    return this.userService.getFavoritesById(userId);
  }

  @ApiOperation({ summary: 'get favorites by username' })
  @ApiResponse({
    status: 200,
    description: 'Favorites provided successfully',
    type: FavoriteTitleDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('favorites/username/:username')
  async getFavoritesByUsername(
    @Param('username') username: string,
  ): Promise<FavoriteTitleDto[]> {
    return this.userService.getFavoritesByUsername(username);
  }

  @ApiOperation({ summary: 'remove movie from favorites by user id' })
  @ApiResponse({
    status: 200,
    description: 'Movie removed successfully',
    type: FavoriteTitleDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete('favorites/id/:userId/:movieId')
  async removeFavoriteByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ): Promise<FavoriteTitleDto> {
    return this.userService.removeFavoriteById(userId, movieId);
  }

  @ApiOperation({ summary: 'remove movie from favorites by username' })
  @ApiResponse({
    status: 200,
    description: 'Movie removed successfully',
    type: FavoriteTitleDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete('favorites/username/:username/:movieId')
  async removeFavoriteByUsername(
    @Param('username') username: string,
    @Param('movieId', ParseIntPipe) movieId: number,
  ): Promise<FavoriteTitleDto> {
    return this.userService.removeFavoriteByUsername(username, movieId);
  }

  @ApiOperation({ summary: 'get playlists' })
  @ApiResponse({
    status: 200,
    description: 'Playlists provided successfully',
    type: PlaylistDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get('playlists/:username')
  async getPlaylists(
    @Param('username') username: string,
  ): Promise<PlaylistDto[]> {
    return this.userService.getPlaylists(username);
  }
}
