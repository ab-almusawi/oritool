import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(email: string, password: string, name: string, role: string = 'user'): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      role,
    })
    return await this.userRepository.save(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } })
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } })
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }
}
