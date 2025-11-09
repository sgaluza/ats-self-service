# Deployment Guide

## Production Deployment

### Prerequisites

- Ubuntu 22.04 or later
- Docker and Docker Compose installed
- Domain name configured
- SSL certificate (Let's Encrypt recommended)

### Environment Variables

Create production environment files:

```bash
# apps/api/.env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:password@postgres:5432/ats
SUPABASE_URL=your-production-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-production-key
JWT_SECRET=your-secure-jwt-secret
WG_SERVER_HOST=your-server-ip
```

### Docker Deployment

1. Build images:
```bash
docker-compose -f docker-compose.prod.yml build
```

2. Start services:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

3. Run migrations:
```bash
docker-compose exec api pnpm prisma migrate deploy
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Monitoring

Set up monitoring with:
- Application logs
- Database monitoring
- WireGuard container health checks
- Resource usage metrics

### Backup Strategy

1. Database backups (daily)
2. Configuration backups
3. Docker volume backups

### Scaling

For horizontal scaling:
- Use load balancer
- Share Redis instance
- Share PostgreSQL instance
- Separate WireGuard hosts if needed

## Security Checklist

- [ ] Change all default passwords
- [ ] Set up firewall rules
- [ ] Enable SSL/TLS
- [ ] Configure rate limiting
- [ ] Set up fail2ban
- [ ] Regular security updates
- [ ] Audit logs enabled
- [ ] Backup encryption
