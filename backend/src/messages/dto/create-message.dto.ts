import { IsString, IsNotEmpty, IsEmail, MaxLength } from 'class-validator'

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  subject: string

  @IsString()
  @IsNotEmpty()
  message: string
}
