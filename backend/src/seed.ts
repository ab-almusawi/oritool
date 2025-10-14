import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UsersService } from './users/users.service'

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const usersService = app.get(UsersService)

  try {
    const existingAdmin = await usersService.findByEmail('admin@oritool.com')
    
    if (!existingAdmin) {
      await usersService.create(
        'admin@oritool.com',
        '19951995@Bh',
        'Administartor',
        'admin',
      )
      console.log('✅ Admin user created successfully!')
      console.log('   Email: admin@oritool.com')
      console.log('   Password: admin123')
    } else {
      console.log('ℹ️  Admin user already exists')
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error)
  } finally {
    await app.close()
  }
}

seed()
