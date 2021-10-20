import {
  Inject,
  Injectable,
  NestMiddleware,
  RequestMethod,
} from '@nestjs/common'

import { Sntl } from '@secjs/intl'
import { ConfigService } from '@nestjs/config'
import { RouteMiddleware } from 'app/Contracts/RouteMiddlewareContract'

@Injectable()
export class IntlMiddleware implements NestMiddleware {
  @Inject(ConfigService) private configService: ConfigService

  static get routes(): RouteMiddleware[] {
    return [{ path: '/', method: RequestMethod.ALL }]
  }

  use(req, res, next) {
    req.locale =
      req.headers['accept-language'] ||
      req.query.lang ||
      this.configService.get('app.locale')

    Sntl.forLocale(req.locale)

    next()
  }
}
