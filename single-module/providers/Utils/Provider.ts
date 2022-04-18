import { Container } from '@secjs/ioc'
import { Folder, Path } from '@secjs/utils'
import { InternalServerException } from '@secjs/exceptions'

export enum InjectionTypes {
  SCHEMA = 'schemas',
  SERVICE = 'services',
  HTTP_MIDDLEWARE = 'http_middlewares',
  HTTP_CONTROLLER = 'http_controllers',
}

export interface ProviderRegisterContract {
  path: string
  importType?: string
}

export abstract class Provider {
  abstract get type(): InjectionTypes
  abstract get register(): ProviderRegisterContract

  protected container: Container

  constructor(container: Container) {
    this.container = container
  }

  boot() {
    const { path, importType = 'module' } = this.register

    const folder = new Folder(Path.pwd(path))

    if (!folder.folderExists) return

    folder.loadSync()

    const extension = Env('NODE_TS', '') === 'true' ? 'ts' : 'js'

    folder.getFilesByPattern(`**/*.${extension}`, true).forEach(file => {
      if (file.extension === '.d.ts') return

      if (importType === 'default') {
        Log.channel('debug').info(`📦 Boot ${file.name}`, {
          namespace: 'api:providers',
        })

        this.container.get(this.type)[file.name] = require(file.path).default
      }

      const Class = require(file.path)[file.name]

      if (!Class) {
        throw new InternalServerException(
          `Provider class name ${file.name} does not exists in exported members inside ${file.path}. The exported class must have the same name of the file to be imported.`,
        )
      }

      if (Class?.prototype?.ignore) {
        Log.channel('debug').warn(`📦 Ignoring ${file.name}`, {
          namespace: 'api:providers',
        })

        return
      }

      if (this.type === InjectionTypes.SCHEMA) {
        const Schema = require(file.path)[`${file.name}Schema`]

        this.container
          .get<Array<any>>(this.type)
          .push({ name: Class.name, schema: Schema })

        return
      }

      Log.channel('debug').info(`📦 Boot ${file.name}`, {
        namespace: 'api:providers',
      })
      this.container.get<Array<any>>(this.type).push(Class)
    })
  }
}
