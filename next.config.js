/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disable SWC minification
  experimental: {
    forceSwcTransforms: false, // Disable SWC transforms
  },
}

module.exports = nextConfig
