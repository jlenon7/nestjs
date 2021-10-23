import { Provider, InjectionTypes } from 'providers/Utils/Provider'

export class ConfigsProvider extends Provider {
  get type() {
    return InjectionTypes.CONFIG
  }

  get register() {
    return {
      fileExt: 'ts',
      filePath: 'config',
      importType: 'default',
    }
  }
}
