import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { RedisCacheService } from 'app/Services/Utils/RedisCacheService'
import { AllExceptionFilter } from 'app/Http/Filters/AllExceptionFilter'
import { ResponseInterceptor } from 'app/Http/Interceptors/ResponseInterceptor'

export class App {
  public server: INestApplication

  private imports: any[]

  constructor(imports: any[]) {
    this.imports = imports
  }

  getInstance<Instance = any>(instance: any) {
    Log.channel('debug').info(
      `Calling ${instance.name} instance from Nest IoC`,
      { namespace: 'api:testing' },
    )

    return this.server.get<Instance>(instance) as Instance
  }

  async initApp() {
    const moduleRef = await Test.createTestingModule({
      imports: this.imports,
    }).compile()

    this.server = moduleRef.createNestApplication()

    this.server.useGlobalFilters(new AllExceptionFilter())
    this.server.useGlobalInterceptors(new ResponseInterceptor())

    await this.server.init()

    Log.channel('debug').info('Nest test module started', {
      namespace: 'api:testing',
    })

    return this
  }

  async closeApp() {
    Log.channel('debug').warn('Nest test module closed', {
      namespace: 'api:testing',
    })

    await this.getInstance(RedisCacheService).close()

    await this.server.close()
  }
}
