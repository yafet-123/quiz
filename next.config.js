/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disable SWC minification
  // NOTE: @react-three/drei is intentionally NOT transpiled here. It ships
  // pre-transpiled ESM; running it through the Babel loader (active because of
  // .babelrc) corrupts the `const [a, ...rest] = ...` destructuring in
  // core/Text3D.js into invalid `...rest = _useMemo[1]` code, which fails with
  // "Module parse failed: Unexpected token". Webpack parses it natively.
  transpilePackages: ['three', '@react-three/fiber'],
  compiler: {
    // Disable SWC compiler completely
  },
  webpack: (config, { isServer }) => {
    // Fallback for fs module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
