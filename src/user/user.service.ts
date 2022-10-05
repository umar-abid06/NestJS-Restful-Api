import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  get(): Promise<User[]> {
    return this.userRepository.find();
  }
  async create(createUserDto: CreateUserDto) {
    const userEmail = createUserDto.email;
    const foundUser = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (foundUser) {
      return { errorMessage: 'Email is already in use! Use a valid email' };
    }
    return this.userRepository.save(createUserDto);
  }
  update(updateUserDto: UpdateUserDto, userId: number) {
    return this.userRepository.update(userId, updateUserDto);
  }
  getById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  getByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  deleteById(userId: number) {
    return this.userRepository.delete(userId);
  }
}
