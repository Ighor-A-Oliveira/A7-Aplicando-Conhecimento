import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConverterModule } from './converter/converter.module';
import { PraticaModule } from './pratica/pratica.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/sustentabilidade',
    ),

    ConverterModule,
    PraticaModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})

export class AppModule {}