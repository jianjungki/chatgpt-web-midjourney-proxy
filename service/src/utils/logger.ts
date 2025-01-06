import pino from 'pino'

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty', // For pretty printing in development
  },
})

export { logger }
