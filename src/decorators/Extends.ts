import { schemasStore } from '../constants';
import { setSchema, setSchemaProperty } from '../utils';

export const Extends = (): ClassDecorator => (prototype: Function) => {
  const schema = prototype['__proto__'];

  if (!schemasStore.get(schema)) {
    setSchema(schema);
  }

  const fieldsOptions = schemasStore.get(schema).entries();

  setSchema(prototype);
  const obj: any = {
    constructor: prototype,
  };

  for (const [key, options] of fieldsOptions) {
    setSchemaProperty(obj, key, options);
  }
};
