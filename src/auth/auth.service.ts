import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Prisma } from '../generated/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;
  private readonly logger = new Logger(UserService.name, { timestamp: true });

  async singnIn(
    params: Prisma.UserCreateInput,
  ): Promise<Omit<Prisma.UserCreateInput, 'password'>> {
    // informando que vai retornar uma promessa de user sem a senha.
    const user = await this.userService.user({ email: params.email });
    if (!user) {
      this.logger.warn(`User with email ${params.email} not found`);
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.#validatePassword(
      params.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.error(`Invalid password for user with email ${params.email}`);
      throw new Error('Invalid credentials');
    }

    this.logger.log(
      `User with email ${params.email} authenticated successfully`,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    console.log(result);

    return result;
  }

  async #validatePassword(passwordParams: string, userPassword: string) {
    return await bcrypt.compare(passwordParams, userPassword);
  }
}
