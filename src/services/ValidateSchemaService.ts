import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ValidationError } from '../errors';
import { IValidateSchemaOptions } from '../interfaces';

@Injectable()
export class ValidateSchemaService {
  public call<T extends object>({ data, classSchema }: IValidateSchemaOptions<T>) {
    const [error] = validateSync(plainToInstance(classSchema, data));

    if (error) {
      throw new ValidationError(error.toString());
    }

    return data;
  }
}
