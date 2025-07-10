/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // NEXT_PUBLIC_BACKEND_SERVER:
    //   "https://trading-backend-production-9c14.up.railway.app/api",
    // NEXT_PUBLIC_STATIC_SERVER:
    //   "https://trading-backend-production-9c14.up.railway.app",
    NEXT_PUBLIC_BACKEND_SERVER:
      "http://localhost:8000/api",
    NEXT_PUBLIC_STATIC_SERVER: "http://localhost:8000",
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
