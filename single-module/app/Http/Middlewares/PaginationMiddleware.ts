import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  RequestMethod,
} from '@nestjs/common'

import { RouteMiddleware } from 'app/Contracts/RouteMiddlewareContract'

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  static get routes(): RouteMiddleware[] {
    return [{ path: '/examples', method: RequestMethod.GET }]
  }

  use(req, res, next) {
    const page = req.query.page ? parseInt(req.query.page) : 0
    const limit = req.query.limit ? parseInt(req.query.limit) : 10

    if (limit > 200) throw new BadRequestException('PAGE_LIMIT_ERROR')

    const resourceUrl = `${Config.get('app.domain')}${req.baseUrl}`

    req.pagination = {
      page,
      limit,
      resourceUrl,
    }

    next()
  }
}
