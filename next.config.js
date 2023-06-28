/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "@stripe/firestore-stripe-payments",
]);
//Pass the modules you would like to see transpiled

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["rb.gy", "image.tmdb.org", "res.cloudinary.com"],
  },
};

module.exports = withTM(nextConfig);
