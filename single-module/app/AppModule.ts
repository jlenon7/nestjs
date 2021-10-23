import kernel from 'start/kernel'
import Container from 'providers/Utils/Container'

import { MiddlewareConsumer, Module } from '@nestjs/common'

@Module({
  imports: kernel,
  providers: Container.get('services'),
  controllers: Container.get('http_controllers'),
  exports: Container.get('services'),
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    Container.get('http_middlewares').forEach(middleware => {
      consumer.apply(middleware.middleware).forRoutes(...middleware.routes)
    })
  }
}
