/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    swcPlugins: [
      ["next-superjson-plugin", {}]
    ]
  },
  images:{
    domains:[
      "res.cloudinary.com"
    ]
  }
}

module.exports = nextConfig
