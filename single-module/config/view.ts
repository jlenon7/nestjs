import { join } from 'path'

export interface IViewConfig {
  paths: {
    mail: string[]
    images: string
    views: string
    assets: string
  }
}

export default {
  /*
  |--------------------------------------------------------------------------
  | View Storage Paths
  |--------------------------------------------------------------------------
  |
  | Most templating systems load templates from disk. Here you may specify
  | an array of paths that should be checked for your views.
  |
  */

  paths: {
    views: join(process.cwd() + '/resources/views'),
    images: join(process.cwd(), '/resources/images'),
    assets: join(process.cwd() + '/public/assets'),
    mail: [process.cwd() + '/public/views/mail'],
  },

  /*
  |--------------------------------------------------------------------------
  | Routes that returns a view
  |--------------------------------------------------------------------------
  |
  | All the routes that need to be ignored inside ResponseInterceptor.
  |
  */

  routes: ['/', '/git/insomnia'],
} as IViewConfig
