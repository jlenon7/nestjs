import { Container } from '@secjs/ioc'
import { Folder, Path } from '@secjs/utils'
import { InternalServerException } from '@secjs/exceptions'

export class Ignite {
  static get providers() {
    const providers = []

    const extension = Env('NODE_TS', '') === 'true' ? 'ts' : 'js'

    new Folder(Path.providers())
      .loadSync()
      .getFilesByPattern(`*Provider.${extension}`, true)
      .forEach(file => {
        if (file.extension === '.d.ts') return

        const Class = require(file.path)[file.name]

        if (!Class) {
          throw new InternalServerException(
            `Provider class name ${file.name} does not exists in exported members inside ${file.path}. The exported class must have the same name of the file to be imported.`,
          )
        }

        providers.push(Class)
      })

    return providers
  }

  static fire(container: Container) {
    container.singleton([], 'schemas')
    container.singleton([], 'services')
    container.singleton([], 'http_middlewares')
    container.singleton([], 'http_controllers')

    this.providers.forEach(Provider => new Provider(container).boot())
  }
}
