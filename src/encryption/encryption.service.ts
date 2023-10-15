import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
} from 'crypto';

@Injectable()
export class EncryptionService {
  constructor(private readonly configService: ConfigService) {}

  private secretKey = this.configService.get<string>('ENCRYPTION_SECRET_KEY');

  private secretIv = this.configService.get<string>('ENCRYPTION_SECRET_IV');

  private encryptionMethod =
    this.configService.get<string>('ENCRYPTION_METHOD');

  // Generate secret hash with crypto to use for encryption
  private generateSecretHash(hashOrKey, key: boolean) {
    const hash = createHash('sha512');
    const updateSecretKey = hash.update(hashOrKey);
    const digestSecretKey = updateSecretKey.digest('hex');
    if (key) {
      const secret = digestSecretKey.substring(0, 32);
      return secret;
    }
    const iV = digestSecretKey.substring(0, 16);
    return iV;
  }
  private key = this.generateSecretHash(this.secretKey, true);
  private encryptionIV = this.generateSecretHash(this.secretIv, false);

  async encryptData(data: string): Promise<string> {
    try {
      const cipher = createCipheriv(
        this.encryptionMethod,
        this.key,
        this.encryptionIV,
      );
      const encryptedData = Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
      ).toString('base64');
      return encryptedData;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  // Decrypt data
  async decryptData(encryptedData): Promise<string> {
    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = createDecipheriv(
      this.encryptionMethod,
      this.key,
      this.encryptionIV,
    );
    return (
      decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
      decipher.final('utf8')
    );
  }
}
