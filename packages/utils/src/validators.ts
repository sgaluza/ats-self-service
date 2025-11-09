/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate IP address (IPv4)
 */
export function isValidIPv4(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  if (!ipv4Regex.test(ip)) return false

  const parts = ip.split('.')
  return parts.every((part) => {
    const num = parseInt(part, 10)
    return num >= 0 && num <= 255
  })
}

/**
 * Validate WireGuard public key format
 */
export function isValidWireguardKey(key: string): boolean {
  // WireGuard keys are base64 encoded, 44 characters
  const keyRegex = /^[A-Za-z0-9+/]{42}[AEIMQUYcgkosw048]=$/
  return keyRegex.test(key)
}

/**
 * Validate password strength
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const minLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  return minLength && hasUppercase && hasLowercase && hasNumber
}
