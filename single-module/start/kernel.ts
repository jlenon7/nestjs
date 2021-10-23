import Container from 'providers/Utils/Container'

import { Ignite } from 'providers/Utils/Ignite'
import { CacheModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

/*
|--------------------------------------------------------------------------
| Ignite
|--------------------------------------------------------------------------
|
| Fire Ignite to start all the NestJS application and the Container.
|
|
*/

Ignite.fire()

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
  ConfigModule.forRoot(Container.get('configModule')),
  CacheModule.registerAsync(Container.get('configs').cache.redis),
]
