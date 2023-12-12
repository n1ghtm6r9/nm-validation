import { Global, Module } from '@nestjs/common';
import { validatorKey } from './constants';
import { IValidator } from './interfaces';
import * as Services from './services';

@Global()
@Module({
  providers: [
    ...Object.values(Services),
    {
      provide: validatorKey,
      useFactory: (validateSchemaService: Services.ValidateSchemaService): IValidator => ({
        validate: validateSchemaService.call,
      }),
      inject: [Services.ValidateSchemaService],
    },
  ],
  exports: [validatorKey],
})
export class ValidationModule {}
