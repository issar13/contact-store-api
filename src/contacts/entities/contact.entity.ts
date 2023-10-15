import { PhoneNumberType } from 'src/shared/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  phoneNumber: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: PhoneNumberType.Personal })
  type: string;
}
