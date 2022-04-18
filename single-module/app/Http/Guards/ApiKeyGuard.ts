import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest()

    const apiKey = request.query.apiKey

    if (apiKey !== Config.get('app.authorization.apiKey')) {
      throw new ForbiddenException('API_KEY_ERROR')
    }

    return true
  }
}
