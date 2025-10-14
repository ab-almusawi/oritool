import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string

  @Column({ type: 'varchar', length: 500, nullable: true })
  productUrl: string

  @Column({ type: 'varchar', length: 100 })
  category: string

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: string

  @Column({ type: 'simple-array', nullable: true })
  features: string[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
