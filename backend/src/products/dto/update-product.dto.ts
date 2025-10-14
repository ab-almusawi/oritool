import { IsString, IsEnum, IsArray, IsOptional, MaxLength } from 'class-validator'

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  @MaxLength(500)
  imageUrl?: string

  @IsString()
  @IsOptional()
  @MaxLength(500)
  productUrl?: string

  @IsString()
  @IsOptional()
  @MaxLength(100)
  category?: string

  @IsEnum(['active', 'inactive'])
  @IsOptional()
  status?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[]
}
