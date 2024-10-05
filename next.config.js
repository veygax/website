/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.pics",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
