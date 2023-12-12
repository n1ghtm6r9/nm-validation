import { IValidateSchemaOptions } from './IValidateSchemaOptions';

export interface IValidator {
  validate<T extends object = {}>(options: IValidateSchemaOptions<T>): T;
}
