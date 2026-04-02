import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, User } from '../generated/client';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}
  private readonly logger = new Logger(UserService.name, { timestamp: true });

  async createUser(dataUser: Prisma.UserCreateInput): Promise<User> {
    this.logger.log(`Creating user with email: ${dataUser.email}`);
    return this.db.user.create({ data: dataUser });
  }

  async getAllUsers(): Promise<User[]> {
    this.logger.log('Fetching all users');
    return this.db.user.findMany();
  }

  async editUser(id: string, dataUser: Prisma.UserUpdateInput): Promise<User> {
    const numericId = Number(id);
    try {
      if (isNaN(numericId)) {
        throw new Error('Invalid user id');
      }

      this.logger.log(`Editing user with id: ${numericId}`);

      const user = await this.db.user.update({
        where: { id: numericId },
        data: dataUser,
      });

      return user;
    } catch (error) {
      this.logger.error(`Error updating user ${numericId}`, error);

      throw new Error('User not found or update failed');
    }
  }

  async deleteUser(id: string): Promise<User> {
    const numericId = Number(id);
    try {
      this.logger.log(`Deleting user with id: ${numericId}`);

      const user = await this.db.user.delete({
        where: { id: numericId },
      });

      return user;
    } catch (error) {
      this.logger.error(`Error deleting user ${numericId}`, error);

      throw new Error('User not found or delete failed');
    }
  }
}
