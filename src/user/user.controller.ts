import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/getUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAllUsers(@Query() queryUser: GetUserDto) {
    return this.userService.getAllUsers(queryUser);
  }

  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Put('/update-user/:id_user')
  updateUser(
    @Param('id_user', ParseIntPipe) id_user: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(updateUserDto, id_user);
  }

  @Put('/delete-user/:id_user')
  deleteUser(@Param('id_user', ParseIntPipe) id_user: number) {
    return this.userService.deleteUser(id_user);
  }

  @Put('/un-delete-user/:id_user')
  unDeleteUser(@Param('id_user', ParseIntPipe) id_user: number) {
    return this.userService.unDeleteUser(id_user);
  }

  @Post('/login')
  getUserById(@Body() authUserDto: AuthUserDto) {
    return this.userService.getUserById(authUserDto);
  }
}
