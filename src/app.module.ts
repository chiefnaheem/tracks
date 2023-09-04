import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuickHttpService } from './quick-http.service';

@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../build'),   // <-- path to the static files
    }),
  ],
  controllers: [AppController],
  providers: [AppService, QuickHttpService],
})
export class AppModule {}
