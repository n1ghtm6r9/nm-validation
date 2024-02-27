import GraphQLJSON from 'graphql-type-json';
import { IsString, IsBoolean, IsNumber, IsOptional, IsDefined, ValidateNested, IsEnum, ArrayMinSize, Min, IsObject } from 'class-validator';
import { schemasStore } from '../constants';
import { IFieldOptions } from '../interfaces';

const { Field: GraphqlField, Float, registerEnumType } = require('@nestjs/graphql');

const simpleTypes: any[] = [String, Number, Boolean, Object];
const enums: string[] = [];

export function setSchemaProperty(schema: Function, key: string, options: IFieldOptions) {
  schemasStore.get(schema.constructor).set(key, options);
  const graphqlFieldOptions = { nullable: Boolean(options.nullable) };
  const classValidatorOptions = { each: Boolean(options.array) };

  if (!simpleTypes.includes(options.type) && !options.enum) {
    if (!options.nullable) {
      IsDefined()(schema, key);
    }

    ValidateNested(classValidatorOptions)(schema, key);
    GraphqlField(() => (options.array ? [options.type] : options.type), graphqlFieldOptions)(schema, key);

    return;
  } else if (options.type === String) {
    GraphqlField(() => (options.array ? [String] : String), graphqlFieldOptions)(schema, key);
    IsString(classValidatorOptions)(schema, key);
  } else if (options.type === Boolean) {
    GraphqlField(() => (options.array ? [Boolean] : Boolean), graphqlFieldOptions)(schema, key);
    IsBoolean(classValidatorOptions)(schema, key);
  } else if (options.type === Number) {
    GraphqlField(() => (options.array ? [Float] : Float), graphqlFieldOptions)(schema, key);
    IsNumber(undefined, classValidatorOptions)(schema, key);

    if (typeof options.meta?.min === 'number') {
      Min(options.meta.min, classValidatorOptions)(schema, key);
    }
    if (typeof options.meta?.max === 'number') {
      Min(options.meta.max, classValidatorOptions)(schema, key);
    }
    if (typeof options.meta?.arrayMinSize === 'number') {
      ArrayMinSize(options.meta.arrayMinSize, classValidatorOptions)(schema, key);
    }
  } else if (options.type === Object) {
    IsObject()(schema, key);
    GraphqlField(() => (options.array ? [GraphQLJSON] : GraphQLJSON), graphqlFieldOptions)(schema, key);
  } else if (options.enum) {
    const enumName = Object.keys(options.type)[0];

    if (!enums.includes(enumName)) {
      registerEnumType(options.type[enumName], { name: enumName });
      enums.push(enumName);
    }

    GraphqlField(() => (options.array ? [options.type[enumName]] : options.type[enumName]), graphqlFieldOptions)(schema, key);
    IsEnum(options.type[enumName], classValidatorOptions)(schema, key);
  }

  if (options.nullable) {
    IsOptional()(schema, key);
  }
}
