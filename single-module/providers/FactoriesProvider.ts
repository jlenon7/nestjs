import { Provider, InjectionTypes } from 'providers/Utils/Provider'

export class FactoriesProvider extends Provider {
  get type() {
    return InjectionTypes.SERVICE
  }

  get register() {
    return {
      fileExt: 'ts',
      filePath: 'database/factories',
    }
  }
}
