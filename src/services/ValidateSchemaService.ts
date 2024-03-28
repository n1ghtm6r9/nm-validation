import { Injectable } from '@nestjs/common';
import { validateSchema } from 'src/utils';

@Injectable()
export class ValidateSchemaService {
  public call = validateSchema;
}
