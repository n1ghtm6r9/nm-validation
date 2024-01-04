import { schemasStore } from '../constants';
import { setSchema, setSchemaProperty } from '../utils';

export const Extends = (): ClassDecorator => (prototype: Function) => {
  const schema = prototype['__proto__'];
  const fieldsOptions = schemasStore.get(schema.name).entries();

  setSchema(prototype);
  const obj: any = {
    constructor: prototype,
  };

  for (const [key, options] of fieldsOptions) {
    setSchemaProperty(obj, key, options);
  }
};
