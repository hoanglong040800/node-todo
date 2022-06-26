import express, { Express, json } from 'express'
import 'dotenv/config'
import routes from 'routes'
import { checkApiVersion } from 'middleware'

const app: Express = express()
const port = process.env.PORT

// middleware
app.use(json())
checkApiVersion(app)

routes(app)

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`)
})
