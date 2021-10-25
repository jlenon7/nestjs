import * as glob from 'glob'
import * as path from 'path'

import { Debugger } from '@secjs/logger'
import { Container } from '@secjs/ioc'

export enum InjectionTypes {
  CONFIG = 'configs',
  SERVICE = 'services',
  HTTP_MIDDLEWARE = 'http_middlewares',
  HTTP_CONTROLLER = 'http_controllers',
}

export interface ProviderRegisterContract {
  filePath: string
  fileExt?: string
  importType?: string
}

export abstract class Provider {
  abstract get type(): InjectionTypes
  abstract get register(): ProviderRegisterContract

  protected container: Container
  protected debug = new Debugger('api:provider')

  constructor(container: Container) {
    this.container = container
  }

  boot() {
    const { filePath, fileExt = 'ts', importType = 'module' } = this.register

    glob.sync(`${filePath}/**/*.${fileExt}`).forEach(file => {
      const fileName = path.parse(file).name
      const replacedPath = `${process.cwd()}/dist/${file.replace(
        `.${fileExt}`,
        '.js',
      )}`

      if (importType === 'default') {
        this.debug.debug(`📦 Boot ${fileName}`)

        this.container.get(this.type)[fileName] = require(replacedPath).default

        return
      }

      const Class = require(replacedPath)[fileName]

      if (Class?.prototype?.ignore) {
        this.debug.warn(`📦 Ignoring ${fileName}`)

        return
      }

      this.debug.debug(`📦 Boot ${fileName}`)
      this.container.get<Array<any>>(this.type).push(Class)
    })
  }
}
