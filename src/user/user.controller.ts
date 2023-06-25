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
import { ChangePassWord } from './dto/change-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/')
  getAllUsers(@Query() queryUser: GetUserDto) {
    return this.userService.getAllUsers(queryUser);
  }

  @Get('/admin')
  getAdmin() {
    return this.userService.getAdmin();
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
  userLogin(@Body() authUserDto: AuthUserDto) {
    return this.userService.getUserLogin(authUserDto);
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Put('/change-password/:id')
  async changePassWord(
    @Param('id') id: number,
    @Body() changePassWord: ChangePassWord,
  ) {
    return await this.userService.changePassWord(id, changePassWord);
  }
}
