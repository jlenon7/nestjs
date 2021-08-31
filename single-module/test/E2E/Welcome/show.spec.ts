import * as request from 'supertest'

import { App } from 'test/Utils'
import { Debug } from '@secjs/logger'
import { AppModule } from 'app/AppModule'

describe('\n[E2E] Welcome 🔍', () => {
  it('should return welcome payload from API', async () => {
    const status = 200
    const method = 'GET'
    const path = '/welcome'

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .expect(status)

    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.commit).toBeTruthy()
  })
})

let app: App

beforeEach(async () => {
  Debug(`Executing ${beforeEach.name}`, 'api:test')

  app = await new App([AppModule]).initApp()
})

afterEach(async () => {
  Debug(`Executing ${afterEach.name}`, 'api:test')

  await app.closeApp()
})