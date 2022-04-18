import { Provider, InjectionTypes } from 'providers/Utils/Provider'

export class SeedsProvider extends Provider {
  get type() {
    return InjectionTypes.SERVICE
  }

  get register() {
    return {
      importType: 'module',
      path: 'database/seeds',
    }
  }
}
