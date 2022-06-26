import express, { Express } from 'express'
import 'dotenv/config'
import routes from 'routes'
import { commonMiddleware } from 'middleware'

const app: Express = express()
const port = process.env.PORT

commonMiddleware(app)

routes(app)

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`)
})
