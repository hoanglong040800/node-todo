import express, { Express } from 'express'
import 'dotenv/config'
import routes from 'server.routes'
import bodyParser from 'body-parser'

const app: Express = express()
const port = process.env.PORT

// ====== Middleware ======

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// use for route based on api version
app.use((req, res, next) => {
	req.version = req.headers['accept-version']
	next()
})

// ====== Routing ======

routes(app)

app.listen(port, () => {
	console.log(`⚡️ Server is running at http://localhost:${port} ⚡️\n`)
})
