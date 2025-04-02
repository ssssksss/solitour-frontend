/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone", // Notice: Docker 이미지를 빌드할 때 output: "standalone"으로 설정합니다. Vercel 배포 시에는 주석 처리해야 합니다.
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
