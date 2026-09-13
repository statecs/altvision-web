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
