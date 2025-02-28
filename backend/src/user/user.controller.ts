import { Controller, Get, Patch, Param, UseGuards, SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../middleware/role.guard';
import { AdminGuard } from '../middleware/admin.guard';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  // ✅ Accessible only by Admin
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  // ✅ Promote User to Admin (Only Admins can do this)
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id/make-admin')
  async makeAdmin(@Param('id') userId: string) {
    return this.userService.makeAdmin(userId);
  }

  // ✅ Restrict Access to Admins Using RoleGuard (Alternative)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SetMetadata('role', 'admin') 
  @Patch(':id/enable')
  async enableUser(@Param('id') userId: string) {
    return this.userService.enableUser(userId);
  }
}
