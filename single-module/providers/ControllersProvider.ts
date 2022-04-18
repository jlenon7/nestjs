import { Provider, InjectionTypes } from 'providers/Utils/Provider'

export class ControllersProvider extends Provider {
  get type() {
    return InjectionTypes.HTTP_CONTROLLER
  }

  get register() {
    return {
      importType: 'module',
      path: 'app/Http/Controllers',
    }
  }
}
