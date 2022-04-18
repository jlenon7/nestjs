import { Sntl } from '@secjs/intl'
import { RouteMiddleware } from 'app/Contracts/RouteMiddlewareContract'
import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common'

@Injectable()
export class IntlMiddleware implements NestMiddleware {
  static get routes(): RouteMiddleware[] {
    return [{ path: '/', method: RequestMethod.ALL }]
  }

  use(req, res, next) {
    req.locale =
      req.headers['accept-language'] ||
      req.query.lang ||
      Config.get('app.locale')

    req.locale = req.locale.split(',')[0].toLowerCase()

    Sntl.forLocale(req.locale)

    next()
  }
}
