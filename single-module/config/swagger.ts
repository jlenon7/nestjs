import { Config } from '@secjs/config'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'

export interface ISwaggerConfig {
  prefix: string
  createDocument: (app: any) => OpenAPIObject
}

export default {
  prefix: `${Config.get('app.prefix.name')}/swagger`,
  createDocument: app =>
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(Config.get('app.name'))
        .setDescription(Config.get('app.description'))
        .setVersion(Config.get('app.version'))
        // .addApiKey({ type: 'apiKey', name: 'apiKey', in: 'query' }, 'apiKey')
        .build(),
      {},
    ),
} as ISwaggerConfig
