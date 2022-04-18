import { App } from 'tests/Utils'
import { Connection } from 'mongoose'
import { RedisCacheService } from 'app/Services/Utils/RedisCacheService'

export class Database {
  private app: App
  private mongoose: Connection

  constructor(app: App) {
    this.app = app
    this.mongoose = this.getConnection()
  }

  getConnection() {
    return this.app.getInstance<Connection>('DatabaseConnection')
  }

  getRepository<Repository>(repository: any) {
    return this.app.getInstance<Repository>(repository)
  }

  async closeConnection() {
    await this.mongoose.close()
  }

  async truncate() {
    const promises = []

    const collections = await this.mongoose.db.collections()

    collections.forEach(collection => {
      promises.push(collection.deleteMany({}))
    })

    await Promise.all(promises)
  }

  async truncateCache() {
    const redisService = this.app.getInstance(RedisCacheService)

    await redisService.truncate()
  }
}
