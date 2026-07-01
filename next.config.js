/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['jsx', 'js'],
  env: {
    NEXT_PUBLIC_THRONE_PASSWORD: process.env.THRONE_PASSWORD
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

module.exports = nextConfig;
