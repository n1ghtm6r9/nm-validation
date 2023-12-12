import { Injectable, CanActivate, UseGuards, Inject } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ClassConstructor } from 'class-transformer';
import { validatorKey } from '../constants';
import { IValidator } from '../interfaces';

export const Validate = (classSchema: ClassConstructor<object>) => {
  @Injectable()
  class ValidateGuard implements CanActivate {
    constructor(@Inject(validatorKey) protected readonly validator: IValidator) {}

    async canActivate(context: ExecutionContextHost): Promise<boolean> {
      this.validator.validate({
        data: context.getArgByIndex(0),
        classSchema,
      });
      return true;
    }
  }

  return (target: object, propertyKey: string, propertyDescriptor: PropertyDescriptor) => {
    UseGuards(ValidateGuard)(target, propertyKey, propertyDescriptor);
  };
};
