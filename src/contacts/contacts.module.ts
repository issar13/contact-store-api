import { Module } from '@nestjs/common';
import { ContactController } from './contacts.controller';
import { ContactService } from './contacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), EncryptionModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactsModule {}
