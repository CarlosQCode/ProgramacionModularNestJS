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
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dtos';
import { CategoriesService } from 'src/services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesServices: CategoriesService) {}
  // Manejar dos parametros en una misma ruta
  @Get(':id/products/:productId')
  getCategorys(@Param('id') id: string, @Param('productId') productId: string) {
    return `Product ${productId} and Category ${id}`;
  }

  @Get()
  getCategories() {
    return this.categoriesServices.findAll();
  }

  @Get(':categoryId')
  @HttpCode(HttpStatus.ACCEPTED)
  getCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesServices.findOne(categoryId);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesServices.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesServices.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesServices.remove(id);
  }
}
