import { Provider, InjectionTypes } from 'providers/Utils/Provider'

export class MiddlewaresProvider extends Provider {
  get type() {
    return InjectionTypes.HTTP_MIDDLEWARE
  }

  get register() {
    return {
      importType: 'module',
      path: 'app/Http/Middlewares',
    }
  }
}
