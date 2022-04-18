import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'

import { Logger } from '@secjs/logger'
import { Request, Response } from 'express'
import { ExceptionContract } from 'app/Contracts/ExceptionContract'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private logger = new Logger({
    namespace: 'api:exceptions',
    context: AllExceptionFilter.name,
  })

  private errorMappers = Config.get('app.errorMappers')

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const fullException = this.filterException(exception)

    if (fullException.message === 'Cannot GET /favicon.ico') return

    this.logger.channel('debug').error(JSON.stringify(fullException))

    const env = Config.get<string>('app.environment')

    if (['development', 'production'].includes(env)) {
      this.logger.error(
        JSON.stringify({
          code: fullException.name,
          path: request.route?.path,
          method: request.method,
          status: fullException.status,
          timestamp: new Date().toISOString(),
          error: fullException,
        }),
      )
    }

    const error = {
      ...fullException,
    }

    if (env !== 'development') {
      delete error.stack
    }

    delete error.status

    const responseError: any = {
      code: fullException.name,
      path: request.route?.path,
      method: request.method,
      status: fullException.status,
      timestamp: new Date().toISOString(),
      error,
    }

    return response.status(fullException.status).json(responseError)
  }

  filterException(exception: any): ExceptionContract {
    const fullException: ExceptionContract = {
      name: exception.name,
      message: exception.getResponse
        ? exception.getResponse()
        : 'Internal Server Error',
      status: exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR,
      stack: exception.stack,
    }

    if (exception.isSecJsException) return this.errorMappers.secJs(exception)

    return fullException
  }
}
