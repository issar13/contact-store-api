import { HttpException, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
// import { Contact } from './db/entities/transaction.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Contact } from 'src/contacts/entities/contact.entity';
import { ContactsModule } from 'src/contacts/contacts.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationError } from 'class-validator';

config();

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: configService.get('POSTGRES_PORT'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DB'),
      entities: [Contact],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ContactsModule,
    EncryptionModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            console.log(errors);
            return new HttpException(errors[0].constraints, 400);
          },
          whitelist: true,
        }),
    },
    AppService,
  ],
})
export class AppModule {}
