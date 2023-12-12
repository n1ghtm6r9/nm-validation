import { ClassConstructor } from 'class-transformer';

export interface IValidateSchemaOptions<T extends object> {
  data: T;
  classSchema: ClassConstructor<T>;
}
