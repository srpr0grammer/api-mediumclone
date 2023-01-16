import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { UserModule } from './users/user.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TagModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.17.0.5',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'api-mediumclone',
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
})
export class AppModule {}
