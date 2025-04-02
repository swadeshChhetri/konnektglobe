/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["tradesfairs.com"],
  }
  // ,
  // webpack: (config, { dev }) => {
  //   if (dev) {
  //     config.watchOptions = {
  //       ignored: ["**/node_modules/**", "**/.next/**", "**/public/**"], // Ignore unnecessary paths
  //       poll: false, // Prevents polling for file changes
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;
