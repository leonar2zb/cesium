/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_PIXEL_URL: process.env.NEXT_PUBLIC_PIXEL_URL,
    NEXT_PUBLIC_PIXEL_URL1: process.env.NEXT_PUBLIC_PIXEL_URL1,
    NEXT_PUBLIC_PIXEL_URL2: process.env.NEXT_PUBLIC_PIXEL_URL2,
    NEXT_PUBLIC_PIXEL_URL3: process.env.NEXT_PUBLIC_PIXEL_URL3,
  },
};

module.exports = nextConfig;
