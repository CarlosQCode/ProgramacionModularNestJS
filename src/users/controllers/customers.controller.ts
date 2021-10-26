import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/custumer.dto';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'List all customers' })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'List one customer' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Created one customer' })
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update one customer' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleted one customer' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(+id);
  }
}
