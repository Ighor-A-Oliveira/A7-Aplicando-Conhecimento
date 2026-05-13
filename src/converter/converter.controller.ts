import { Controller, Get, Param } from '@nestjs/common';
import { ConverterService } from './converter.service';

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Get(':minutos')
  converter(@Param('minutos') minutos: string): string {
    return this.converterService.converter(Number(minutos));
  }
}
