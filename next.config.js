/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    swcMinify: false
  },
  images:{
    domains:[
      "res.cloudinary.com"
    ]
  }
}

module.exports = nextConfig
