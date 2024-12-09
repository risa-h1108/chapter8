const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.jp" },
      { protocol: "https", hostname: "images.microcms-assets.io" }, //画面を読み込むのを許可するnext.jsの仕様
    ],
  },
};

export default nextConfig;
