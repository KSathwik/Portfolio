import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/*
 * Content Security Policy: the page may only load code, styles and fonts from this site, images
 * from this site and Spotify, and frames from this site (the résumé) and Spotify's player.
 * 'unsafe-inline' scripts are needed by Next's inline bootstrap and the theme script (a nonce
 * would make every page render dynamically); there is no user-generated HTML on the site.
 * vercel.live is Vercel's preview-deployment toolbar.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://vercel.live${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.scdn.co https://avatars.githubusercontent.com https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live",
  `connect-src 'self' https://vercel.live wss://ws-us3.pusher.com${isDev ? " ws: http://localhost:*" : ""}`,
  "frame-src 'self' https://open.spotify.com https://vercel.live",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // The résumé PDF is shown in a frame on this site, so allow same-site framing only.
  "frame-ancestors 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework in a response header.
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        // Artist photos for the music section, served by Spotify.
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      // The contact API's answers are never cached.
      { source: "/api/(.*)", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
};

export default nextConfig;
