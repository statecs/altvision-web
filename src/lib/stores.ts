// Where AltVision can be installed from. The browser stores are listed
// with the visitor's own browser first so the matching "Add to …" button
// is the one they see first.
export const WORDPRESS_PLUGIN_URL = 'https://wordpress.org/plugins/altvision-ai-alt-text-generator/';

export type BrowserStore = {
  id: 'chrome' | 'firefox';
  url: string;
  labelKey: string;
  trackLabel: string;
};

const CHROME: BrowserStore = {
  id: 'chrome',
  url: 'https://chromewebstore.google.com/detail/altvision/iogpbgncdhijknmmhkllijfaioecfcoa',
  labelKey: 'home.hero.chromeButton',
  trackLabel: 'chrome_extension',
};

const FIREFOX: BrowserStore = {
  id: 'firefox',
  url: 'https://addons.mozilla.org/firefox/addon/alt-vision/',
  labelKey: 'home.hero.firefoxButton',
  trackLabel: 'firefox_extension',
};

const isFirefox = typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent);

export const BROWSER_STORES: BrowserStore[] = isFirefox ? [FIREFOX, CHROME] : [CHROME, FIREFOX];

// Chrome Web Store and addons.mozilla.org both report utm_source/utm_medium/
// utm_content in their listing stats, so tag every link from the site with
// where on the page it was clicked. WordPress.org has no such report.
// Structured data and llms.txt keep the clean URLs (scripts/prerender.js).
export const storeLink = (url: string, placement: string) => {
  if (url === WORDPRESS_PLUGIN_URL) return url;
  const u = new URL(url);
  u.searchParams.set('utm_source', 'altvision.se');
  u.searchParams.set('utm_medium', 'website');
  u.searchParams.set('utm_content', placement);
  return u.toString();
};
