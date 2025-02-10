/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // FRONTEND_SERVER: "http://localhost:3000",
    // BACKEND_SERVER: "http://localhost:8000/api",
    // STATIC_SERVER: "http://localhost:8000",

    FRONTEND_SERVER: "https://trading-backend-production-1d53.up.railway.app",
    BACKEND_SERVER: "https://trading-backend-production-1d53.up.railway.app/api",
    STATIC_SERVER: "https://trading-backend-production-1d53.up.railway.app",
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
