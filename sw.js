importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

//workbox.loadModule('workbox-routing');
workbox.loadModule("workbox-recipes");
//workbox.loadModule("workbox-strategies");
//workbox.loadModule('workbox-expiration');
//const { setCatchHandler, registerRoute } = workbox.routing;
const {  pageCache,
    imageCache,
    staticResourceCache,
    googleFontsCache,
    offlineFallback } = workbox.recipes;
//const {NetworkFirst, StaleWhileRevalidate} = workbox.strategies

pageCache();
googleFontsCache();
staticResourceCache();
imageCache();
offlineFallback();

//const {ExpirationPlugin} = workbox.expiration

/*
const cacheName = 'static-resources';
const matchCallback = ({request}) =>
  // CSS
  request.destination === 'style' ||
  // JavaScript
  request.destination === 'script' ||
  // Web Workers
  request.destination === 'worker';

registerRoute(
    matchCallback,
    new StaleWhileRevalidate({
        cacheName,
    })
    );

const cacheName = 'images';
const matchCallback = ({request}) => request.destination === 'image';
const maxAgeSeconds = 30 * 24 * 60 * 60;
const maxEntries = 60;

registerRoute(
    matchCallback,
    new CacheFirst({
        cacheName,
        plugins: [
            new ExpirationPlugin({
                maxEntries,
                maxAgeSeconds,
            }),
            ],
    })
    );

const files = [
    // "sw.js",
    // "manifest.json",
    // "sitemap.xml",
    // "index.xml",
    "404.html",
    // "static/contentIndex.xml",
    // "static/icon.png",
    // "static/icon.svg",
    // "static/og-image.png",
    "advanced/architecture.html",
    "advanced/creating-components.html",
    "advanced/index.html",
    "advanced/making-plugins.html",
    "advanced/paths.html",
    "authoring-content.html",
    "build.html",
    "configuration.html",
    "features/backlinks.html",
    "features/callouts.html","features/darkmode.html",
    "features/folder-and-tag-listings.html",
    "features/full-text-search.html",
    "features/graph-view.html",
    "features/index.html",
    "features/Latex.html",
    "features/Mermaid-diagrams.html",
    "features/Obsidian-compatibility.html",
    "features/OxHugo-compatibility.html",
    "features/popover-previews.html",
    "features/private-pages.html",
    "features/recent-notes.html",
    "features/RSS-Feed.html",
    "features/SPA-Routing.html",
    "features/syntax-highlighting.html",    "features/table-of-contents.html",
    "features/wikilinks.html",
    "hosting.html",
    "index.css",
    "index.html",
    "layout.html",
    "migrating-from-Quartz-3.html",
    "philosophy.html",
    "postscript.js",
    "prescript.js",
    "showcase.html",
    "tags/component.html",
    "tags/index.html",
    "tags/plugin.html",
    "tags/plugin/emitter.html",
    "tags/plugin/filter.html",
    "tags/plugin/transformer.html",    
    "upgrading.html",
]

self.addEventListener('install', event => {
    event.waitUntil(
        self.caches.open('offline-fallbacks')
        .then(cache => cache.addAll(files))
        );
});

setCatchHandler(async (options) => {
    const destination = options.request.destination;
    const cache = await self.caches.open('offline-fallbacks');
    //if (destination === 'document') {
    return (await cache.match('***.{html,png,jpg,jpeg,svg,gif,css,xml,js,json}')) || Response.error();
    //}
    // return Response.error();
});*/