import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '../generated/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('')
  async createUser(@Body() dataUser: Prisma.UserCreateInput) {
    return this.userService.createUser(dataUser);
  }

  @Get('')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Patch('/:id')
  async editUser(@Param('id') id: string, @Body() dataUser: Prisma.UserUpdateInput) {
    return this.userService.editUser(id, dataUser);
  }
}
