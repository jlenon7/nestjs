import { Provider, InjectionTypes } from 'providers/Utils/Provider'

export class RepositoriesProvider extends Provider {
  get type() {
    return InjectionTypes.SERVICE
  }

  get register() {
    return {
      importType: 'module',
      path: 'app/Repositories',
    }
  }
}
