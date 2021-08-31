import Env from '@secjs/env'

import { ApplicationProvider } from 'providers/ApplicationProvider'

const createUri = (name: string): string => {
  if (name === 'default') name = ''

  const options = Env(`${name}DB_OPTIONS`, '')
  const user = Env(`${name}DB_USERNAME`, 'root')
  const pass = Env(`${name}DB_PASSWORD`, 'root')
  const db = Env(`${name}DB_DATABASE`, 'mongodb')
  const con = Env(`${name}DB_CONNECTION`, 'mongodb+srv')
  const host = Env(`${name}DB_HOST`, 'cluster0.uagp0.mongodb.net')

  return `${con}://${user}:${pass}@${host}/${db}?${options}`
}

export default {
  /*
  |--------------------------------------------------------------------------
  | MongoDb
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for Mongo database.
  |
  | npm i --save mongoose
  |
  */
  default: {
    url: createUri('default'),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      connectionName: 'default',
    },
    schemas: ApplicationProvider.schemas,
  },
}
