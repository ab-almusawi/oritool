import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Message } from './message.entity'
import { CreateMessageDto } from './dto/create-message.dto'

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(createMessageDto)
    return await this.messageRepository.save(message)
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id } })
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`)
    }
    return message
  }

  async markAsRead(id: string): Promise<Message> {
    const message = await this.findOne(id)
    message.isRead = true
    return await this.messageRepository.save(message)
  }

  async delete(id: string): Promise<void> {
    const message = await this.findOne(id)
    await this.messageRepository.remove(message)
  }

  async getUnreadCount(): Promise<number> {
    return await this.messageRepository.count({ where: { isRead: false } })
  }
}
