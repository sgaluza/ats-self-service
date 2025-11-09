import dotenv from 'dotenv'

dotenv.config()

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  host: process.env.HOST || '0.0.0.0',

  database: {
    url: process.env.DATABASE_URL || '',
  },

  supabase: {
    url: process.env.SUPABASE_URL || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },

  jwtSecret: process.env.JWT_SECRET || 'change-this-secret',

  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },

  wireguard: {
    serverHost: process.env.WG_SERVER_HOST || '',
    basePort: parseInt(process.env.WG_BASE_PORT || '25000', 10),
    networkPrefix: process.env.WG_NETWORK_PREFIX || '10.7.7',
  },

  proxy: {
    basePort: parseInt(process.env.PROXY_BASE_PORT || '36000', 10),
  },

  email: {
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      user: process.env.SMTP_USER || '',
      password: process.env.SMTP_PASSWORD || '',
    },
    from: process.env.EMAIL_FROM || 'noreply@ats-service.com',
  },

  app: {
    url: process.env.APP_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:3001',
  },

  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),

  rateLimit: {
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    timeWindow: parseInt(process.env.RATE_LIMIT_TIMEWINDOW || '60000', 10),
  },

  docker: {
    socket: process.env.DOCKER_SOCKET || '/var/run/docker.sock',
    image: process.env.DOCKER_IMAGE || 'sgaluza/ats-wg:0.6',
  },
}
