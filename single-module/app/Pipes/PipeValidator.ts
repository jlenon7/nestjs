import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common'

import { ModuleRef } from '@nestjs/core'
import { PipeValidatorContract } from 'app/Contracts/PipeValidatorContract'

@Injectable()
export class PipeValidator<T> implements PipeValidatorContract {
  @Inject(ModuleRef)
  private moduleRef: ModuleRef

  transform(value: any, metadata: any) {
    const validator = this.moduleRef.get(metadata.metatype.validator)

    return this.validate(validator, metadata.metatype.type, value).catch(
      error => {
        throw new UnprocessableEntityException({
          name: 'Unprocessable Entity Error',
          message: error,
          statusCode: 422,
        })
      },
    )
  }

  validate(validator: any, type: string, value: Partial<T>) {
    return validator.validate(value, type)
  }
}
