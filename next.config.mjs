/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "s3-eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "backend-p8-kaza.onrender.com",
      },
    ],
  },
};
export default nextConfig;