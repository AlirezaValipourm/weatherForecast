import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin"
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    defaultLocale: "en-US",
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'fa-IR',],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.weatherbit.io',
      },
    ],
  },
};

export default withNextIntl('./i18n.ts')(nextConfig);
