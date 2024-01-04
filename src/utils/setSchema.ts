import { InputType, ObjectType } from '@nestjs/graphql';
import { schemasStore } from '../constants';

export function setSchema(schema: Function) {
  if (schemasStore.get(schema.name)) {
    return;
  }

  const name = schema.name.replace('Dto', '');

  const isInput = Boolean(['Input', 'Request'].find(v => name.includes(v)));

  InputType(`${!isInput ? 'Input' : ''}${name}`)(schema);

  if (!isInput) {
    ObjectType(name)(schema);
  }

  schemasStore.set(schema.name, new Map());
}
