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

export class AddContactDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MinLength(10)
  @MaxLength(13)
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsEnum(PhoneNumberType)
  @ApiProperty()
  @IsOptional()
  type: string;
}
