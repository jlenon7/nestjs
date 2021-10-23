import { Provider, InjectionTypes } from 'providers/Utils/Provider'

export class MiddlewaresProvider extends Provider {
  get type() {
    return InjectionTypes.HTTP_MIDDLEWARE
  }

  get register() {
    return {
      fileExt: 'ts',
      filePath: 'app/Http/Middlewares',
    }
  }
}
