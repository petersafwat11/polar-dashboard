/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // FRONTEND_SERVER: "http://localhost:3000",
    // BACKEND_SERVER: "http://localhost:8000/api",
    // STATIC_SERVER: "http://localhost:8000",
    // trading-backend-production-5af8.up.railway.app
    FRONTEND_SERVER: "trading-backend-production-5af8.up.railway.app",
    BACKEND_SERVER: "trading-backend-production-5af8.up.railway.app/api",
    STATIC_SERVER: "trading-backend-production-5af8.up.railway.app",
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
