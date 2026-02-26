/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(self)', // adjust based on permissions needed
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://code.jquery.com https://cdn.jsdelivr.net;
              script-src-elem 'self' 'unsafe-inline' https://code.jquery.com https://cdn.jsdelivr.net;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://design.elpasotexas.gov;
              style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://design.elpasotexas.gov;
              font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net https://design.elpasotexas.gov data:;
              img-src 'self' data:;
              connect-src 'self' https://gis.elpasotexas.gov;
              frame-ancestors 'self';
              `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },

  // other options (keep these if you need them)
  // output: 'export',
  // basePath: '',
  // trailingSlash: true,
};

export default nextConfig;
