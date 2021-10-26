import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/category.dto';
import { CategoriesService } from 'src/products/services/categories.service';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesServices: CategoriesService) {}

  // Manejar dos parametros en una misma ruta
  @Get(':id/products/:productId')
  @ApiOperation({ summary: 'List all prodcuts of categorie' })
  getCategorys(@Param('id') id: string, @Param('productId') productId: string) {
    return `Product ${productId} and Category ${id}`;
  }

  @Get()
  @ApiOperation({ summary: 'List all categories' })
  getCategories() {
    return this.categoriesServices.findAll();
  }

  @Get(':categoryId')
  @ApiOperation({ summary: 'List one categorie' })
  @HttpCode(HttpStatus.ACCEPTED)
  getCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesServices.findOne(categoryId);
  }

  @Post()
  @ApiOperation({ summary: 'Created one cotegorie' })
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesServices.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update categorie' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesServices.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleted categorie' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesServices.remove(id);
  }
}
