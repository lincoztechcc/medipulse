/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@hospital/ui", "@hospital/permissions", "@hospital/auth", "@hospital/database"],
}

module.exports = nextConfig
