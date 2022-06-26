import { Express, json } from 'express'

export default function commonMiddleware(app: Express) {
  app.use(json())

  app.use(function (req, res, next) {
    req.version = req.headers['accept-version']
    next()
  })
}
