import { Sntl } from '@secjs/intl'
import { Container } from '@secjs/ioc'
import { CacheModule } from '@nestjs/common'
import { Ignite } from 'providers/Utils/Ignite'
import { MongooseModule } from '@nestjs/mongoose'

/*
|--------------------------------------------------------------------------
| Globals
|--------------------------------------------------------------------------
|
| Here we import all the globals functions and variables from the application
| in order of execution. Env global comes first to load all the environment
| vars, then the Config global switch on the NODE_TS env verification for Path
| class and load config folder files. Then Logger global get the logging config
| file to create the channels.
|
*/

import '@secjs/env/src/utils/global'
import '@secjs/config/src/utils/global'
import '@secjs/logger/src/utils/global'

/*
|--------------------------------------------------------------------------
| Container
|--------------------------------------------------------------------------
|
| This is the archives container that will be thrown inside NestJS AppModule.
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
| Load Sntl
|--------------------------------------------------------------------------
|
| Load all internationalization files from the application.
|
*/

new Sntl().setDefaultLocale(Config.get('app.locale')).loadSync()

/*
|--------------------------------------------------------------------------
| Kernel
|--------------------------------------------------------------------------
|
| Kernel is the imports from AppModule, all the external modules that
| needs to be inside NestJS IoC, will be exported in this Array.
|
*/

export default [
  CacheModule.register(Config.get('cache.redis')),
  MongooseModule.forRoot(Config.get('database.default.url')),
  MongooseModule.forFeature(container.get('schemas')),
]
