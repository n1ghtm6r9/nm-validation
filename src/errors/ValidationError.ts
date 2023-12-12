import { BaseError } from '@nmxjs/errors';

export class ValidationError extends BaseError {
  public static readonly code = 'VALIDATION_ERROR';
  constructor(message: string) {
    super({
      code: ValidationError.code,
      message,
    });
  }
}
