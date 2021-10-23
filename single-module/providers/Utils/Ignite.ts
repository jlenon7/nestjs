import * as glob from 'glob'
import * as path from 'path'

import Container from 'providers/Utils/Container'

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

  static fire() {
    this.providers.forEach(Provider => new Provider().boot())

    Container.set('configModule', {
      isGlobal: true,
      ignoreEnvFile: true,
      load: [() => Container.get('configs')],
    })
  }
}
