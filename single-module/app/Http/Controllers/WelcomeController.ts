import { ApiTags } from '@nestjs/swagger'
import { getCommitId } from '@secjs/utils'
import { ConfigService } from '@nestjs/config'
import { Controller, Get } from '@nestjs/common'

@Controller()
@ApiTags('Welcome')
export class WelcomeController {
  constructor(private configService: ConfigService) {}

  @Get(['', '/welcome', '/healthcheck'])
  async welcome() {
    return {
      commit: await getCommitId(),
      greeting: `Welcome to ${this.configService.get('app.name')}!`,
      domain: this.configService.get('app.appUrl'),
      prefix: this.configService.get('app.prefix'),
      version: this.configService.get('app.version'),
      description: this.configService.get('app.description'),
    }
  }
}
