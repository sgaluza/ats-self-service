/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ats/ui', '@ats/types', '@ats/utils'],
  images: {
    domains: ['localhost'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'ATS Self-Service',
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
  },
}

module.exports = nextConfig
