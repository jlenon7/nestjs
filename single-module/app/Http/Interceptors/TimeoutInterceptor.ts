import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
  RequestTimeoutException,
} from '@nestjs/common'

import { catchError, timeout } from 'rxjs/operators'
import { Observable, throwError, TimeoutError } from 'rxjs'

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(Config.get('http.timeout')),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException())
        }

        return throwError(err)
      }),
    )
  }
}
