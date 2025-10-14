import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 255 })
  email: string

  @Column({ type: 'varchar', length: 255 })
  subject: string

  @Column({ type: 'text' })
  message: string

  @Column({ type: 'boolean', default: false })
  isRead: boolean

  @CreateDateColumn()
  createdAt: Date
}
