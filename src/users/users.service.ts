import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, FindManyOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  find(options: FindManyOptions): Promise<User[]> {
    return this.usersRepository.find(options);
  }

  findOne(conditions): Promise<User> {
    return this.usersRepository.findOne(conditions);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };
    const createdUser = this.usersRepository.create(userWithHashedPassword);

    return this.usersRepository.save(createdUser);
  }

  async updateUser(userId: string, updateUserDto: object): Promise<any> {
    const updateResult = await this.usersRepository.update(
      userId,
      updateUserDto,
    );
    console.log(`updateResult: `, updateResult);

    return updateResult;
  }

  async removeUser(userId: string): Promise<User> {
    const targetUser = await this.usersRepository.findOne(userId);

    return this.usersRepository.remove(targetUser);
  }

  private async hashPassword(plainTextPassword: string): Promise<string> {
    return bcrypt.hash(plainTextPassword, 10);
  }
}
