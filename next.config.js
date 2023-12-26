/** @type {import('next').NextConfig} */
const nextConfig = {
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
    hideSourceMaps: true,
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring-tunnel',
  },
};

module.exports = nextConfig;
