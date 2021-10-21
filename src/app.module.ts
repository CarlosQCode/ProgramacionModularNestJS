import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { BrandsController } from './controllers/brands.controller';
import { CostumersController } from './controllers/costumers.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    OrdersController,
    UsersController,
    BrandsController,
    CostumersController,
  ],
  providers: [AppService, ProductsService, CategoriesService, UsersService],
})
export class AppModule {}
