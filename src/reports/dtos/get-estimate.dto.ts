import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  @Min(1950)
  @Max(new Date().getFullYear())
  @Transform(({ value }) => parseInt(value))
  year: number;
  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  lng: number;
  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  lat: number;
  @IsNumber()
  @Min(0)
  @Max(1000000)
  @Transform(({ value }) => parseInt(value))
  mileage: number;
}
