import { Test } from '@nestjs/testing'
import { Debugger } from '@secjs/logger'
import { INestApplication } from '@nestjs/common'
import { AllExceptionFilter } from 'app/Http/Filters/AllExceptionFilter'
import { ResponseInterceptor } from 'app/Http/Interceptors/ResponseInterceptor'

export class App {
  private imports: any[]
  private debug = new Debugger('api:test')
  public server: INestApplication

  constructor(imports: any[]) {
    this.imports = imports
  }

  getInstance<Instance = any>(instance: any) {
    this.debug.debug(`Calling ${instance} instance from Nest IoC`)

    return this.server.get<Instance>(instance) as Instance
  }

  async initApp() {
    const moduleRef = await Test.createTestingModule({
      imports: this.imports,
    }).compile()

    this.server = moduleRef.createNestApplication()

    const Config = this.getInstance<any>('ConfigService')
    this.server.useGlobalInterceptors(new ResponseInterceptor())
    this.server.useGlobalFilters(new AllExceptionFilter(Config))

    await this.server.init()

    this.debug.debug('Nest test module started')

    return this
  }

  async closeApp() {
    this.debug.warn('Nest test module closed')

    await this.server.close()
  }
}
