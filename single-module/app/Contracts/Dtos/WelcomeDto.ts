import * as Joi from 'joi'

import { ApiProperty } from '@nestjs/swagger'

export class WelcomeDto {
  static schema = Joi.object({
    test: Joi.string().required(),
  })

  @ApiProperty()
  test: string
}
