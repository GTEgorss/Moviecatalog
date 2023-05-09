import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Session } from './session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
  @ApiOperation({ summary: 'revoke user session' })
  @Post('session/revoke')
  @UseGuards(new AuthGuard())
  async revoke(@Session() session: SessionContainer): Promise<string> {
    await session.revokeSession();
    return 'User session revoked';
  }
}
