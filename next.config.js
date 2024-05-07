/** @type {import("next").NextConfig} */
export default {
  reactStrictMode: true,

  // https://nextjs.org/docs/api-reference/next.config.js/rewrites
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*",
      },
    ];
  },

  // https://nextjs.org/docs/api-reference/next.config.js/redirects
  redirects: async () => {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
