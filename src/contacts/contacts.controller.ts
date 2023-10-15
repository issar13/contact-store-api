import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contacts.service';
import { AddContactDto } from './dtos/contact.dto';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateContactDto } from './dtos/update-contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // POST request to add a new contact
  @Post('')
  @HttpCode(201)
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'create contact and encrypt for storage' })
  addContact(@Body() data: AddContactDto) {
    return this.contactService.addContact(data);
  }

  @Get(':contactId')
  @HttpCode(200)
  @ApiOkResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'get a single contact from database and decrypt' })
  getContact(@Param('contactId') contactId: number) {
    return this.contactService.getContact(contactId);
  }

  @Get('')
  @HttpCode(200)
  @ApiOkResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'get all contacts from database and decrypt' })
  getContacts() {
    return this.contactService.getAllContacts();
  }

  @Patch(':contactId')
  @HttpCode(200)
  @ApiOkResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'update a single contact and encrypt' })
  updateContact(
    @Param('contactId') contactId: number,
    @Body() data: UpdateContactDto,
  ) {
    return this.contactService.updateContact(contactId, data);
  }

  @Delete(':contactId')
  @HttpCode(200)
  @ApiOkResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'delete contact from database' })
  deleteContact(@Param('contactId') contactId: number) {
    return this.contactService.deleteContact(contactId);
  }
}
