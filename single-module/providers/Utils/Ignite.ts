import * as glob from 'glob'
import * as path from 'path'

import { Container } from '@secjs/ioc'

export class Ignite {
  static get providers() {
    const providers = []

    glob.sync(`providers/*.ts`).forEach(provider => {
      const providerName = path.parse(provider).name
      const replacedPath = `${process.cwd()}/dist/${provider.replace(
        `.ts`,
        '.js',
      )}`

      providers.push(require(replacedPath)[providerName])
    })

    return providers
  }

  static fire(container: Container) {
    container.singleton({}, 'configs')
    container.singleton([], 'services')
    container.singleton([], 'http_middlewares')
    container.singleton([], 'http_controllers')

    this.providers.forEach(Provider => new Provider(container).boot())

    container.singleton(
      {
        isGlobal: true,
        ignoreEnvFile: true,
        load: [() => container.get('configs')],
      },
      'configModule',
    )
  }
}
