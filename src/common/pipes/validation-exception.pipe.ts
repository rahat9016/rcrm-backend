import {
  BadRequestException,
  Injectable,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

interface FormattedErrors {
  [field: string]: string;
}

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors: FormattedErrors = {};

        errors.forEach((error) => {
          if (error.constraints) {
            formattedErrors[error.property] = Object.values(
              error.constraints,
            )[0];
          }

          if (error.children?.length) {
            const childErrors = this.formatNestedErrors(error.children);
            Object.assign(formattedErrors, childErrors);
          }
        });

        return new BadRequestException({
          success: false,
          statusCode: 400,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    });
  }

  private formatNestedErrors(errors: ValidationError[]): FormattedErrors {
    const nested: FormattedErrors = {};

    for (const error of errors) {
      if (error.constraints) {
        nested[error.property] = Object.values(error.constraints)[0];
      }

      if (error.children?.length) {
        Object.assign(nested, this.formatNestedErrors(error.children));
      }
    }

    return nested;
  }
}
