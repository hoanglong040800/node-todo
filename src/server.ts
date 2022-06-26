import express, { Express, json } from 'express'
import 'dotenv/config'
import routes from 'api/routes'

const app: Express = express()
const port = process.env.PORT

app.use(json())

routes(app)

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`)
})
