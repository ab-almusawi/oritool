import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string
}
