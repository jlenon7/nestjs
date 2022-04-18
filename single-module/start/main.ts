import * as helmet from 'helmet'
import * as express from 'express'
import * as rateLimit from 'express-rate-limit'

import { Path } from '@secjs/utils'
import { AppModule } from 'app/AppModule'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AllExceptionFilter } from 'app/Http/Filters/AllExceptionFilter'
import { TimeoutInterceptor } from 'app/Http/Interceptors/TimeoutInterceptor'
import { ResponseInterceptor } from 'app/Http/Interceptors/ResponseInterceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const { name, exclude } = Config.get('app.prefix')
  const { prefix, createDocument } = Config.get('swagger')

  app.use(helmet())
  app.use(rateLimit(Config.get('ratelimit')))

  app.setGlobalPrefix(name, { exclude })
  app.enableCors(Config.get('cors'))
  app.setBaseViewsDir(Path.noBuild().views())
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor(), new TimeoutInterceptor())
  app.setViewEngine('hbs')

  app.use('/assets', express.static(Path.noBuild().assets()))
  app.use('/images', express.static(Path.noBuild().storage('app/images')))

  SwaggerModule.setup(prefix, app, createDocument(app))

  await app.listen(Config.get('app.port'))
}

bootstrap().catch()
