import * as helmet from 'helmet'
import * as Express from 'express'
import * as rateLimit from 'express-rate-limit'

import ApplicationProvider from 'providers/ApplicationProvider'

import { AppModule } from 'app/AppModule'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule } from '@nestjs/swagger'
import { AllExceptionFilter } from 'app/Http/Filters/AllExceptionFilter'
import { ResponseInterceptor } from 'app/Http/Interceptors/ResponseInterceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const Config: ConfigService = app.get(ConfigService)

  const swagger = Config.get('swagger')
  const prefix = Config.get('app.prefix')

  app.use(helmet())
  app.use(rateLimit(Config.get('rateLimit')))

  app.setGlobalPrefix(prefix)
  app.enableCors(Config.get('cors'))
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new AllExceptionFilter(Config))

  app.use(
    Config.get('view.paths.staticPath'),
    Express.static(Config.get('view.paths.images')),
  )

  SwaggerModule.setup(swagger.prefix, app, swagger.createDocument(app))

  await app.listen(Config.get('app.port'))
  ApplicationProvider.clearMemory()
}

bootstrap().catch()
