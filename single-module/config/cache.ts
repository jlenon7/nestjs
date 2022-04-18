import * as redisStore from 'cache-manager-redis-store'

import { Config } from '@secjs/config'

export interface ICacheConfig {
  redis: {
    store: any
    ttl: number
    host: string
    port: string
    password: string
  }
}

export default {
  /*
  |--------------------------------------------------------------------------
  | Redis cache configuration module
  |--------------------------------------------------------------------------
  |
  | Values used to export Redis Configuration to cache application.
  |
  */

  redis: {
    store: redisStore,
    ttl: 0,
    host: Config.get('database.redis.host'),
    port: Config.get('database.redis.port'),
    password: Config.get('database.redis.password'),
  },
} as ICacheConfig
