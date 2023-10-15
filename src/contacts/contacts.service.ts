import { HttpException, Injectable } from '@nestjs/common';
import { AddContactDto } from './dtos/contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { EncryptionService } from 'src/encryption/encryption.service';
import { UpdateContactDto } from './dtos/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly encryptionService: EncryptionService,
  ) {}
  //service to add contacts to the database
  async addContact(data: AddContactDto) {
    try {
      const encryptedData = await this.encryptObjectValues(
        data,
        this.encryptionService,
      );
      const createContact = await this.contactRepository.create({
        phoneNumber: encryptedData.phoneNumber,
        firstName: encryptedData.firstName,
        lastName: encryptedData.lastName,
        type: encryptedData.type,
      });
      return await this.contactRepository.save(createContact);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async getContact(contactId: number) {
    try {
      console.log(contactId);
      const encryptedContact = await this.contactRepository.findOne({
        where: { id: Equal(contactId) },
      });
      if (!encryptedContact) {
        throw new HttpException(`Contact  does not exist`, 404);
      }
      const contact = await this.decryptObjectValues(
        encryptedContact,
        this.encryptionService,
      );

      return contact;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async getAllContacts(): Promise<Contact[]> {
    try {
      const contacts = await this.contactRepository.find({});
      if (!contacts) {
        throw new HttpException(`No contacts found`, 404);
      }

      const decryptedContacts = await Promise.all(
        contacts.map((contact) =>
          this.decryptObjectValues(contact, this.encryptionService),
        ),
      );

      return decryptedContacts;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async updateContact(
    contactId: number,
    data: UpdateContactDto,
  ): Promise<Contact> {
    try {
      const encryptedData = await this.encryptObjectValues(
        data,
        this.encryptionService,
      );
      const updateContact = await this.contactRepository.findOne({
        where: { id: contactId },
      });
      const updateId = await this.contactRepository.merge(updateContact, {
        phoneNumber: encryptedData.phoneNumber,
        firstName: encryptedData.firstName,
        lastName: encryptedData.lastName,
        type: encryptedData.type,
      });
      return await this.contactRepository.save(updateId);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async deleteContact(contactId: number) {
    try {
      const deleteContact = await this.contactRepository.delete({
        id: contactId,
      });
      if (!deleteContact) {
        throw new HttpException(
          `Contact with id ${contactId} does not exist`,
          404,
        );
      }
      return deleteContact;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  private async encryptObjectValues(
    obj: Contact,
    encryptionService: EncryptionService,
  ): Promise<Record<string, any>> {
    const encryptedObj: Contact = {
      phoneNumber: '',
      firstName: '',
      lastName: '',
      type: '',
    };
    for (const [key, value] of Object.entries(obj)) {
      encryptedObj[key] = await encryptionService.encryptData(value);
    }
    return encryptedObj;
  }

  private async decryptObjectValues(
    obj: Contact,
    encryptionService: EncryptionService,
  ): Promise<Contact> {
    const decryptedObj: Contact = {
      phoneNumber: '',
      firstName: '',
      lastName: '',
      type: '',
    };
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'id') {
        decryptedObj[key] = value;
      } else {
        decryptedObj[key] = await encryptionService.decryptData(value);
      }
    }
    return decryptedObj;
  }
}
