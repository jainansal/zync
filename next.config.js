/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "common-js utf-8-validate",
      bufferutil: "common-js bufferutil",
    });

    return config;
  },
  images: {
    domains: ["utfs.io"],
  },
};

module.exports = nextConfig;
