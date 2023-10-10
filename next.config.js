/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
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
