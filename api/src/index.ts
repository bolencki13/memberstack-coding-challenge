import * as dotenv from 'dotenv'
import Database from './services/Database'

dotenv.config()

const uri = process.env.DB_URI
if (!uri) {
  throw new Error('DB_URI is not set in env.')
}
const db = new Database(uri)

import { app } from './http/server' // intentionally imported here due to service container restraints

const port = process.env.PORT || 8000
app.listen({ port }, async () => {
  await db.connect()
  console.log(`🚀 Server ready at http://localhost:${port}`)
})
