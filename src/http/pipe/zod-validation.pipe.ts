import { PipeTransform, BadRequestException } from '@nestjs/common'
import { fromError } from 'zod-validation-error'
import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Validation error',
          errors: fromError(error),
        })
      }
      throw new BadRequestException('Validation error')
    }
  }
}
