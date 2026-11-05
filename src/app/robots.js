export default function robots() {
  const disallowedPaths = [
    '/709832/',
    '/709832',
    '/api/admin/',
    '/api/admin',
    '/admin/',
    '/admin',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: disallowedPaths,
      },
      {
        userAgent: [
          'Googlebot',
          'Google-Extended',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Applebot',
          'Applebot-Extended',
          'Meta-ExternalAgent',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: disallowedPaths,
      },
    ],
    sitemap: 'https://merxodevsolutions.pro.bd/sitemap.xml',
    host: 'https://merxodevsolutions.pro.bd',
  };
}
