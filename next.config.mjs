/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [`${process.env.IMAGE_SOURCE_LINK_STARTER}`], 
  },
};

export default nextConfig;
