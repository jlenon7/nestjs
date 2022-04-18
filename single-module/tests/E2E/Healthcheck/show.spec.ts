import * as request from 'supertest'

import { App } from 'tests/Utils'
import { AppModule } from 'app/AppModule'

describe('\n[E2E] Healthcheck 🔍', () => {
  it('should return healthcheck payload from API in en-us', async () => {
    const status = 200
    const method = 'GET'
    const path = '/healthcheck?lang=en-us'

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .expect(status)

    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.commit).toBeTruthy()
    expect(body.data.greeting).toBe('Welcome to NestJS NoSQL!')
  })

  it('should return healthcheck payload from API in pt-br', async () => {
    const status = 200
    const method = 'GET'
    const path = '/healthcheck'

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .set('Accept-Language', 'pt-br')
      .expect(status)

    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.commit).toBeTruthy()
    expect(body.data.greeting).toBe('Bem vindo a NestJS NoSQL!')
  })
})

let app: App

beforeEach(async () => {
  Log.channel('debug').warn(`Executing ${beforeEach.name}`, {
    namespace: 'api:testing',
  })

  app = await new App([AppModule]).initApp()
})

afterEach(async () => {
  Log.channel('debug').warn(`Executing ${afterEach.name}`, {
    namespace: 'api:testing',
  })

  await app.closeApp()
})
