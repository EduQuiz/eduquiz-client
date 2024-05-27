/** @type {import("next").NextConfig} */
export default {
  reactStrictMode: true,

  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*",
      },
    ];
  },
};
