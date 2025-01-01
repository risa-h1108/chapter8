/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "w1980.blob.core.windows.net",
        pathname: "/pg3/**",
      },
      {
        protocol: "https",
        hostname: "placehold.jp",
      },
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
      {
        protocol: "https",
        hostname: "pudpdsuupbyrgglqqrfb.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
