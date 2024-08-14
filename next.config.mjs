/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/solitour-bucket/**",
      },
      {
        // TODO: 테스트 목적
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/images/diary/**",
      },
    ],
  },
};

export default nextConfig;
