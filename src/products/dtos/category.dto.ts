import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the name of category' })
  readonly name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
