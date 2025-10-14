import { IsString, IsNotEmpty, IsEnum, IsArray, IsOptional, MaxLength } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsOptional()
  @MaxLength(500)
  imageUrl?: string

  @IsString()
  @IsOptional()
  @MaxLength(500)
  productUrl?: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  category: string

  @IsEnum(['active', 'inactive'])
  @IsOptional()
  status?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[]
}
