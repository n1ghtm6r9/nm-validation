import { validateSchema } from '../utils';

const { Args } = require('@nestjs/graphql');

export const ValidArgs = (property: string) =>
  Args(
    property,
    {},
    {
      transform: (data, meta) => validateSchema({ data, classSchema: meta.metatype }),
    },
  );
