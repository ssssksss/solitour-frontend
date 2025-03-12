/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone", // Docker 이미지를 빌드할 때 output: "standalone"으로 설정합니다.
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/solitour-bucket/**",
      },
    ],
  },
};

export default nextConfig;
