import { Express } from 'express'

export function checkApiVersion(app: Express) {
  app.use(function (req, res, next) {
    //req.version is used to determine the version
    req.version = req.headers['accept-version']
    next()
  })
}
