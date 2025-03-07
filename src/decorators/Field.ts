import 'reflect-metadata';
import { IFieldOptions } from '../interfaces';
import { setSchema, setSchemaProperty } from '../utils';

export const Field =
  (options: IFieldOptions): PropertyDecorator =>
  (prototype: Function, propertyKey: string) => {
    Reflect.defineMetadata(`field:${propertyKey}`, options, prototype.constructor);

    setSchema(prototype.constructor);
    setSchemaProperty(prototype, propertyKey, options);
  };
