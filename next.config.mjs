/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // FRONTEND_SERVER: "http://localhost:3000",
    // NEXT_PUBLIC_BACKEND_SERVER: "http://localhost:8000/api",
    // STATIC_SERVER: "http://localhost:8000",
    // trading-backend-production-5af8.up.railway.app
    NEXT_PUBLIC_NEXT_PUBLIC_BACKEND_SERVER:
      "https://trading-backend-production-5af8.up.railway.app/api",
    NEXT_PUBLIC_STATIC_SERVER:
      "https://trading-backend-production-5af8.up.railway.app",
    // FRONTEND_SERVER: "trading-backend-production-5af8.up.railway.app",
    // NEXT_PUBLIC_BACKEND_SERVER: "trading-backend-production-5af8.up.railway.app/api",
    // STATIC_SERVER: "trading-backend-production-5af8.up.railway.app",
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
