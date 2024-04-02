import { ValidationError } from 'class-validator';

export function getNestedErrorProperty(error: ValidationError) {
  let result = error.property;

  if (error.children?.length) {
    result = `${result}.${getNestedErrorProperty(error.children[0])}`;
  }

  return result;
}
