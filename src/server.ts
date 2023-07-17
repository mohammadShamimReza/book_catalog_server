import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/logger'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected to database successfully')
    server = app.listen(config.port, () => {
      logger.info('Applistening on port' + config.port)
    })
  } catch (error) {
    errorlogger.error('Failed to connect to database', error)
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is recived')
  if (server) {
    server.close()
  }
})
