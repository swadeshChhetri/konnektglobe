/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Or 'http' if your images are served over HTTP
        hostname: 'tradesfairs.com',
        pathname: '**', // This allows any path under the hostname
      },
    ],
  }
};

export default nextConfig;
