import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { config } from './config'

const fastify = Fastify({
  logger: {
    level: config.nodeEnv === 'development' ? 'debug' : 'info',
    transport:
      config.nodeEnv === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
  },
})

// Register plugins
await fastify.register(fastifyHelmet)
await fastify.register(fastifyCors, {
  origin: config.allowedOrigins,
  credentials: true,
})
await fastify.register(fastifyRateLimit, {
  max: config.rateLimit.max,
  timeWindow: config.rateLimit.timeWindow,
})
await fastify.register(fastifyJwt, {
  secret: config.jwtSecret,
})
await fastify.register(fastifyCookie)

// Health check
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

// Start server
try {
  await fastify.listen({ port: config.port, host: config.host })
  console.log(`Server listening on ${config.host}:${config.port}`)
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
