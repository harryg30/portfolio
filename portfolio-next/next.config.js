const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'node_modules/leaflet/dist/images',
            to: path.resolve(__dirname, 'public', 'leaflet', 'images')
          },
        ],
      }),
    )
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig
