import kernel, { container } from 'start/kernel'

import { MiddlewareConsumer, Module } from '@nestjs/common'

@Module({
  imports: kernel,
  providers: container.get('services'),
  controllers: container.get('http_controllers'),
  exports: container.get('services'),
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    container.get<Array<any>>('http_middlewares').forEach(middleware => {
      consumer.apply(middleware).forRoutes(...middleware.routes)
    })
  }
}
