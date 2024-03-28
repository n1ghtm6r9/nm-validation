import type { IValidateSchemaOptions } from '../interfaces';
import { ValidationError } from '@nmxjs/errors';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validateSchema = <T extends object>({ data, classSchema }: IValidateSchemaOptions<T>) => {
  const [error] = validateSync(plainToInstance(classSchema, data));

  if (error) {
    throw new ValidationError(error.property);
  }

  return data;
};
