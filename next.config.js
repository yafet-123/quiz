/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // @react-three/drei ships pre-transpiled ESM. With SWC enabled (no .babelrc),
  // webpack parses it natively. transpilePackages ensures SWC handles packages
  // that ship modern ES syntax that may need transpilation for the target.
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
