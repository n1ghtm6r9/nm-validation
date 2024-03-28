import { Injectable } from '@nestjs/common';
import { validateSchema } from '../utils';

@Injectable()
export class ValidateSchemaService {
  public call = validateSchema;
}
