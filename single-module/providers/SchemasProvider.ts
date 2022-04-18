import { Provider, InjectionTypes } from 'providers/Utils/Provider'

export class SchemasProvider extends Provider {
  get type() {
    return InjectionTypes.SCHEMA
  }

  get register() {
    return {
      importType: 'module',
      path: 'app/Schemas',
    }
  }
}
