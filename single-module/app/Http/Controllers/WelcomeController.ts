import * as insomniaCollection from 'docs/Collection.json'

import { Sntl } from '@secjs/intl'
import { ApiTags } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { getBranch, getCommitId } from '@secjs/utils'
import { Controller, Get, Render } from '@nestjs/common'

@Controller()
@ApiTags('Welcome')
export class WelcomeController {
  constructor(private configService: ConfigService) {}

  async response() {
    return {
      branch: await getBranch(),
      commit: await getCommitId(),
      greeting: Sntl.formatMessage('welcome.greeting', {
        project: this.configService.get('app.name'),
      }),
      name: this.configService.get('app.name'),
      domain: this.configService.get('app.domain'),
      prefix: this.configService.get('app.prefix.name'),
      version: this.configService.get('app.version'),
      description: this.configService.get('app.description'),
      repository: this.configService.get('app.source'),
      documentation: this.configService.get('app.documentation'),
    }
  }

  @Get('/')
  @Render('documentation')
  // TODO Render docs by locale
  // TODO Implement @secjs/idocs
  async documentation() {
    return this.response()
  }

  @Get('/git')
  async prefix() {
    return this.response()
  }

  @Get('/welcome')
  async welcome() {
    return this.response()
  }

  @Get('/insomnia')
  async insomnia() {
    return insomniaCollection
  }

  // TODO Verify if redis is alive
  // TODO Verify if postgres is alive
  @Get('/healthcheck')
  async healthcheck() {
    return this.response()
  }
}
