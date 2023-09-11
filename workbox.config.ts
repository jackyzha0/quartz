const SECOND = 1
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const MONTH = 30 * DAY

module.exports = {
  // globPatterns: ["**/*.{html,png,jpg,jpeg,svg,gif,css,xml,js,json}"],

  runtimeCaching: [
    {
      // Images
      urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: MONTH,
        },
      },
    },
    {
      // Documents
      urlPattern: /.*\.(?:html)$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'documents',
        expiration: {
          maxEntries: 70,
          maxAgeSeconds: 14 * DAY,
        },
      },
    },
    {
      // Styles
      urlPattern: /.*\.(?:css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'styles',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 14 * DAY,
        },
      },
    },
    {
      // Metadata
      urlPattern: /.*\.(?:xml,json)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'metadata',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: MONTH,
        },
      },
    },
    {
      // Scrips
      urlPattern: /.*\.(?:js)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'scripts',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: DAY,
        },
      },
    },
  ],

  // Don't change that unless you know what you're doing
  globDirectory: "public/",
  swDest: "public/sw.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
}
