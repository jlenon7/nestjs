import { Provider, InjectionTypes } from 'providers/Utils/Provider'

export class RepositoriesProvider extends Provider {
  get type() {
    return InjectionTypes.SERVICE
  }

  get register() {
    return {
      fileExt: 'ts',
      filePath: 'app/Repositories',
    }
  }
}
