import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the name of brand' })
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'the images of brand' })
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
