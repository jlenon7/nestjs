import { Logger } from '@secjs/logger'
import { RouteMiddleware } from 'app/Contracts/RouteMiddlewareContract'
import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common'

@Injectable()
export class LogHttpMiddleware implements NestMiddleware {
  private logger = new Logger({
    namespace: 'api:requests',
    context: 'LogHttpMiddleware',
  }).changeDefaultChannel('debug')

  static get routes(): RouteMiddleware[] {
    return [{ path: '*', method: RequestMethod.ALL }]
  }

  use(req, res, next) {
    const url = req.url
    const method = req.method
    const rateLimit = req.rateLimit

    this.logger.info(`REQUEST: ${method} - ${url}`)
    this.logger.warn(`Rate limit: ${JSON.stringify(rateLimit)}`)

    next()
  }
}
