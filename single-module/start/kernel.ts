import App from 'providers/ApplicationProvider'

import { CacheModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

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
  ConfigModule.forRoot(App.configModule),
  CacheModule.registerAsync(App.configs.cache.redis),
]
