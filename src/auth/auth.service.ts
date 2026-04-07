import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Prisma } from '../generated/client';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;
  private readonly logger = new Logger(UserService.name, { timestamp: true });

  async singnIn(params: Prisma.UserCreateInput) {
    const user = await this.userService.user({ email: params.email });
    if (!user) {
      this.logger.warn(`User with email ${params.email} not found`);
      throw new Error('Invalid credentials');
    }
  }
}
