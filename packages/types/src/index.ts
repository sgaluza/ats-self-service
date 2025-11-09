// User types
export type UserRole = 'ADMIN' | 'USER'
export type UserStatus = 'ACTIVE' | 'BLOCKED' | 'DELETED'

export interface User {
  id: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
}

// Invitation types
export type InvitationStatus = 'ACTIVE' | 'USED' | 'REVOKED' | 'EXPIRED'

export interface Invitation {
  id: string
  key: string
  email?: string
  status: InvitationStatus
  createdAt: string
  usedAt?: string
  expiresAt?: string
  createdById: string
  usedById?: string
}

// WireGuard types
export type ConnectionStatus = 'PENDING' | 'CONNECTED' | 'DISCONNECTED' | 'ERROR'

export interface WireguardConfig {
  id: string
  userId: string
  deviceName: string
  publicKey: string
  privateKey: string
  presharedKey: string
  serverIp: string
  serverPort: number
  peerIp: string
  containerId?: string
  status: ConnectionStatus
  createdAt: string
  updatedAt: string
}

// Proxy types
export interface ProxyConfig {
  id: string
  wireguardConfigId: string
  username: string
  password: string
  host: string
  port: number
  createdAt: string
  updatedAt: string
}

// Connection stats types
export interface ConnectionStat {
  id: string
  wireguardConfigId: string
  timestamp: string
  status: ConnectionStatus
  bytesSent: number
  bytesReceived: number
  speedMbps?: number
  latencyMs?: number
}

// Audit log types
export interface AuditLog {
  id: string
  userId?: string
  adminId?: string
  action: string
  entityType: string
  entityId?: string
  details?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
  createdAt: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}
