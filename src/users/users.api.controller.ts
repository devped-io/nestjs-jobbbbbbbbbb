import {
  Controller,
  Post,
  Body,
  ConflictException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UsersService } from './users.service';
import { ER_DUP_ENTRY } from 'mysql/lib/protocol/constants/errors';

@Controller('api/v1/users')
export class UsersApiController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    try {
      const user = await this.usersService.createUser(createUserDto);

      return user;
    } catch (e) {
      console.log(e)
      if (e.errno === ER_DUP_ENTRY) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: `Email '${createUserDto.email}' already exists`,
        });
      }

      throw new InternalServerErrorException();
    }
  }
}
