import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/**', // يسمح بجميع المسارات تحت هذا الدومين
      },
    ],
  },
};

export default nextConfig;







// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//    images: {
//     remotePatterns: [new URL('https://ecommerce.routemisr.com/**')],
//   },
// };

// export default nextConfig;
