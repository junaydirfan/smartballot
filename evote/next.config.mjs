/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.csv$/,
      use: 'raw-loader', // Use raw-loader to import CSV as a string
    });

    return config;
  },
};

export default nextConfig;
