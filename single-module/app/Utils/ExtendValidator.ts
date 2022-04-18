import { ModuleRef } from '@nestjs/core'
import { Validator } from '@secjs/validator'
import { Injectable, NotImplementedException } from '@nestjs/common'

@Injectable()
export class ExtendValidator {
  private validator: Validator

  constructor(private moduleRef: ModuleRef) {
    this.validator = new Validator()

    this.validator.extendAsync('unique', this.unique)
    this.validator.extendAsync('exists', this.exists)
  }

  unique = async (data: any, field: string, args: string[]) => {
    const repository = this.getRepository(args[0])

    const model = await repository.getOne(null, {
      where: { [field]: this.validator.getValue(data, field) },
    })

    return !model
  }

  exists = async (data: any, field: string, args: string[]) => {
    const repository = this.getRepository(args[1])

    const model = await repository.getOne(null, {
      where: { [args[0]]: this.validator.getValue(data, field) },
    })

    return !!model
  }

  private getRepository(name: string) {
    const repository = this.moduleRef.get(Config.get(`database.tables.${name}`))

    if (!repository) {
      throw new NotImplementedException(
        'Repository not implemented inside database config file.',
      )
    }

    return repository
  }
}
