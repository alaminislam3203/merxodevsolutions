export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/709832/',
          '/709832',
          '/api/admin/',
          '/api/admin',
          '/admin/',
          '/admin',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/709832/',
          '/709832',
          '/api/admin/',
          '/api/admin',
        ],
      },
    ],
    sitemap: 'https://merxodevsolutions.pro.bd/sitemap.xml',
    host: 'https://merxodevsolutions.pro.bd',
  };
}
