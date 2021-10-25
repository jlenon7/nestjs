import { Container } from '@secjs/ioc'
import { CacheModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Ignite } from 'providers/Utils/Ignite'

/*
|--------------------------------------------------------------------------
| Container
|--------------------------------------------------------------------------
|
| This is the archives container that will be threw inside NestJS AppModule.
|
*/

export const container = new Container()

/*
|--------------------------------------------------------------------------
| Ignite
|--------------------------------------------------------------------------
|
| Fire Ignite to start all the NestJS application and the Container.
|
*/

Ignite.fire(container)

/*
|--------------------------------------------------------------------------
| Kernel
|--------------------------------------------------------------------------
|
| Kernel is the imports from AppModule, all of the external modules that
| needs to be inside of NestJS IoC, will be exported in this Array.
|
*/

export default [
  ConfigModule.forRoot(container.get('configModule')),
  CacheModule.registerAsync(container.get<any>('configs').cache.redis),
]
