/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  //  distDir: "dist",
  images: { unoptimized: true },
  output: "standalone",
};

module.exports = nextConfig;
