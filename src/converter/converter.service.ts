import { Injectable } from '@nestjs/common';

@Injectable()
export class ConverterService {
  converter(minutos: number): string {
    const horasPorDia = minutos / 60;
    const horasSemanais = (minutos * 7) / 60;
    const percentualDia = (minutos / 1440) * 100;

    return `${minutos} minutos correspondem a ${horasPorDia}h por dia, ou ${horasSemanais}h semanais (${percentualDia.toFixed(1)}% do seu tempo diário).`;
  }
}
