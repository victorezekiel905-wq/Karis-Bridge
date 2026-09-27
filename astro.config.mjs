// @ts-check
import { defineConfig } from 'astro/config';

// Set SITE_URL in your hosting environment (e.g. https://karisbridgeschools.com)
// to enable absolute canonical and social-share URLs.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  trailingSlash: 'ignore',
  compressHTML: true,
  devToolbar: { enabled: false },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
});
