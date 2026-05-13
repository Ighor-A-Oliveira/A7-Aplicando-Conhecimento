import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';

import { PraticaService } from './pratica.service';
import { CreatePraticaDto } from './dto/create-pratica.dto';

@Controller()
export class PraticaController {

  constructor(
    private readonly praticaService: PraticaService
  ) {}

  @Post('pratica')
  criar(@Body() body: CreatePraticaDto) {
    return this.praticaService.criar(body);
  }

  @Get('historico')
  listar(@Query() query: any) {
    return this.praticaService.listar(query);
  }

  @Get('estatisticas')
  estatisticas() {
    return this.praticaService.estatisticas();
  }
}