/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'otakudesu.blog' },
    ],
  },
};

module.exports = nextConfig;
