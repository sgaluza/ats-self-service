/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Format speed in Mbps
 */
export function formatSpeed(mbps: number): string {
  if (mbps < 1) {
    return `${(mbps * 1000).toFixed(0)} Kbps`
  }
  return `${mbps.toFixed(2)} Mbps`
}

/**
 * Format latency in ms
 */
export function formatLatency(ms: number): string {
  return `${ms.toFixed(0)} ms`
}
