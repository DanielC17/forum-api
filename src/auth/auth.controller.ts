import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '../generated/client';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signin')
  signIn(@Body() body: Prisma.UserCreateInput) {
    return this.authService.singnIn(body);
  }
}
