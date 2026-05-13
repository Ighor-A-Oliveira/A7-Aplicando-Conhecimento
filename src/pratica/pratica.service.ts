import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pratica, PraticaDocument } from './pratica.schema';
import { CreatePraticaDto } from './dto/create-pratica.dto';

@Injectable()
export class PraticaService {

  constructor(
    @InjectModel(Pratica.name)
    private praticaModel: Model<PraticaDocument>,
  ) {}

  async criar(dto: CreatePraticaDto) {
    return this.praticaModel.create(dto);
  }

  async listar(filtros: any) {

    const query: any = {};

    if (filtros.nomeUsuario) {
      query.nomeUsuario = filtros.nomeUsuario;
    }

    if (filtros.tipo) {
      query.tipo = filtros.tipo;
    }

    if (filtros.dataInicial && filtros.dataFinal) {
      query.data = {
        $gte: filtros.dataInicial,
        $lte: filtros.dataFinal,
      };
    }

    return this.praticaModel.find(query);
  }

  async estatisticas() {

    const praticas = await this.praticaModel.find();

    const totalGeral = praticas.length;

    const totalPorTipo: any = {};
    const totalPorUsuario: any = {};

    praticas.forEach((p) => {

      totalPorTipo[p.tipo] =
        (totalPorTipo[p.tipo] || 0) + 1;

      totalPorUsuario[p.nomeUsuario] =
        (totalPorUsuario[p.nomeUsuario] || 0) + 1;
    });

    const praticaMaisComum =
      Object.keys(totalPorTipo).reduce((a, b) =>
        totalPorTipo[a] > totalPorTipo[b] ? a : b
      );

    const usuarioMaisAtivo =
      Object.keys(totalPorUsuario).reduce((a, b) =>
        totalPorUsuario[a] > totalPorUsuario[b] ? a : b
      );

    return {
      praticaMaisComum,
      usuarioMaisAtivo,
      totalPorTipo,
      totalGeral,
      mediaDiariaUltimos30Dias: totalGeral / 30,
    };
  }
}