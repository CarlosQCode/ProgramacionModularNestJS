import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'name of the customer' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'lastname of the customer' })
  readonly lastname: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'phone number of the customer' })
  readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
