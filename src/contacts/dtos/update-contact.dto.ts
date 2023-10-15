import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsAlphanumeric,
} from 'class-validator';
import { PhoneNumberType } from 'src/shared/enums';

export class UpdateContactDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MinLength(10)
  @MaxLength(13)
  @IsNotEmpty()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsEnum(PhoneNumberType)
  @ApiProperty()
  @IsOptional()
  type: string;
}
