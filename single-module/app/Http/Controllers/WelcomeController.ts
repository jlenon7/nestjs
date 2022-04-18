import { Sntl } from '@secjs/intl'
import { ApiTags } from '@nestjs/swagger'
import { getBranch, getCommitId } from '@secjs/utils'
import { Controller, Get, Render } from '@nestjs/common'

@Controller()
@ApiTags('Welcome')
export class WelcomeController {
  async response() {
    return {
      branch: await getBranch(),
      commit: await getCommitId(),
      greeting: Sntl.formatMessage('welcome.greeting', {
        project: Config.get('app.name'),
      }),
      name: Config.get('app.name'),
      domain: Config.get('app.domain'),
      prefix: Config.get('app.prefix.name'),
      version: Config.get('app.version'),
      description: Config.get('app.description'),
      repository: Config.get('app.source'),
      documentation: Config.get('app.documentation'),
    }
  }

  @Get('/')
  @Render('documentation')
  // TODO Render docs by locale
  // TODO Implement @secjs/idocs
  async documentation() {
    return this.response()
  }

  @Get(Env('APP_PREFIX', '/api'))
  async prefix() {
    return this.response()
  }

  @Get('/welcome')
  async welcome() {
    return this.response()
  }

  // TODO Verify if redis is alive
  // TODO Verify if postgres is alive
  @Get('/healthcheck')
  async healthcheck() {
    return this.response()
  }
}
