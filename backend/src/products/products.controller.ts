import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import sharp from 'sharp'
import { promises as fs } from 'fs'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { AdminGuard } from '../auth/admin.guard'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/products',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      },
    }),
    fileFilter: (req, file, cb) => {
      console.log('Attempting to upload file:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        fieldname: file.fieldname,
      })
      
      if (!file.mimetype.startsWith('image/')) {
        console.error('File rejected - not an image:', file.mimetype)
        return cb(new Error(`Only image files are allowed! Received: ${file.mimetype}`), false)
      }
      
      console.log('File accepted')
      cb(null, true)
    },
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded or file type not allowed')
    }
    
    console.log('File uploaded successfully:', {
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    })

    try {
      const uploadPath = './uploads/products'
      const originalPath = `${uploadPath}/${file.filename}`
      const nameWithoutExt = file.filename.substring(0, file.filename.lastIndexOf('.'))
      
      // Optimize main image (max 1200px width, 85% quality)
      const optimizedFilename = `${nameWithoutExt}_optimized.webp`
      const optimizedPath = `${uploadPath}/${optimizedFilename}`
      
      await sharp(originalPath)
        .resize(1200, null, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ quality: 85 })
        .toFile(optimizedPath)

      // Create thumbnail (300px width)
      const thumbnailFilename = `${nameWithoutExt}_thumb.webp`
      const thumbnailPath = `${uploadPath}/${thumbnailFilename}`
      
      await sharp(originalPath)
        .resize(300, null, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ quality: 80 })
        .toFile(thumbnailPath)

      // Get file sizes
      const optimizedStats = await fs.stat(optimizedPath)
      const thumbnailStats = await fs.stat(thumbnailPath)
      
      // Delete original unoptimized file to save space
      await fs.unlink(originalPath)

      console.log('Image optimized:', {
        original: `${file.size} bytes`,
        optimized: `${optimizedStats.size} bytes`,
        thumbnail: `${thumbnailStats.size} bytes`,
        savings: `${Math.round((1 - optimizedStats.size / file.size) * 100)}%`
      })

      return {
        url: `/uploads/products/${optimizedFilename}`,
        thumbnailUrl: `/uploads/products/${thumbnailFilename}`,
        filename: optimizedFilename,
        thumbnailFilename,
        originalname: file.originalname,
        size: optimizedStats.size,
        thumbnailSize: thumbnailStats.size,
        originalSize: file.size,
      }
    } catch (error) {
      console.error('Image optimization failed:', error)
      // Return original file if optimization fails
      return {
        url: `/uploads/products/${file.filename}`,
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      }
    }
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    console.log('Creating product with data:', createProductDto)
    return this.productsService.create(createProductDto)
  }

  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id)
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ) {
    console.log('Updating product:', id, 'with data:', updateProductDto)
    return this.productsService.update(id, updateProductDto)
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id)
  }
}
