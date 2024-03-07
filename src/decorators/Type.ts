import { setSchema } from '../utils';

export const Type = (): ClassDecorator => (prototype: Function) => {
  setSchema(prototype, false);
};
