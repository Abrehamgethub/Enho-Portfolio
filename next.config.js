/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable Next.js image optimization on Vercel
    // Remove unoptimized to let Vercel handle optimization automatically
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
