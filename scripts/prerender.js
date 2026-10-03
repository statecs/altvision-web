// Runs after `react-scripts build`. The app is client-rendered, so every URL
// used to return the same empty shell with an English <title> — crawlers that
// don't execute JavaScript (most AI crawlers) saw nothing, and Google saw 31
// identical heads. This writes a real HTML file per locale with its own
// language, title, description, canonical, hreflang, structured data and the
// page's text inside #root (React replaces it on first render), then generates
// sitemap.xml and llms.txt from the same translations.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SITE = 'https://altvision.se';
const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const LOCALES_DIR = path.join(ROOT, 'public', 'locales');
const DEFAULT_LOCALE = 'en';

// Single source for store links and the language list, read from the app code
const storesSrc = fs.readFileSync(path.join(ROOT, 'src/lib/stores.ts'), 'utf8');
const WORDPRESS_URL = storesSrc.match(/WORDPRESS_PLUGIN_URL = '([^']+)'/)[1];
const CHROME_URL = storesSrc.match(/id: 'chrome',\s*url: '([^']+)'/)[1];
const FIREFOX_URL = storesSrc.match(/id: 'firefox',\s*url: '([^']+)'/)[1];
const GITHUB_URL = 'https://github.com/statecs/AltVision-plugin';

const dropdownSrc = fs.readFileSync(path.join(ROOT, 'src/components/LanguageDropdown.tsx'), 'utf8');
const LANGUAGES = [...dropdownSrc.matchAll(/code: '([a-z]+)', name: '([^']+)'/g)].map(([, code, name]) => ({ code, name }));
const LOCALES = LANGUAGES.map((l) => l.code).sort();

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const load = (locale) => JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, locale, 'translation.json'), 'utf8'));
const homeUrl = (locale) => `${SITE}/${locale}/`;

// Last commit touching the given paths, so lastmod reflects real content changes
const lastmod = (...paths) => {
  try {
    const d = execSync(`git log -1 --format=%cs -- ${paths.join(' ')}`, { cwd: ROOT }).toString().trim();
    if (d) return d;
  } catch (e) {}
  return new Date().toISOString().slice(0, 10);
};

// Meta descriptions: whole sentences up to ~160 characters
const summarize = (text, max = 160) => {
  const sentences = text.match(/[^.!?。！？।]+[.!?。！？।]+\s*/g) || [text];
  let out = '';
  for (const s of sentences) {
    if ((out + s).trim().length > max) break;
    out += s;
  }
  out = out.trim();
  if (!out) out = text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
  return out;
};

// Strip the "Label: " prefix some feature strings carry, for schema featureList
const featureText = (s) => s.replace(/^[^:：]{1,40}[:：]\s*/, '');

const pageCopy = (t) => {
  const h = t.home;
  return {
    title: `AltVision – ${h.hero.title} ${h.hero.titleHighlight}`,
    description: summarize(h.description),
    wpFeatures: ['oneClick', 'wpReady', 'formatSupport', 'accessibility'].map((k) => h.wordpress[k]),
    extFeatures: ['altTextDetection', 'contextAware', 'multipleLanguages', 'visualTools'].map((k) => h.chrome[k]),
    faq: Array.isArray(h.faq.items) ? h.faq.items : [],
  };
};

const structuredData = (locale, t, copy) => {
  const url = homeUrl(locale);
  const author = { '@type': 'Person', '@id': `${SITE}/#author`, name: 'Christopher State', url: 'https://cstate.se' };
  const offers = { '@type': 'Offer', price: '0', priceCurrency: 'USD' };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      author,
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: `${SITE}/`,
        name: 'AltVision',
        publisher: { '@id': `${SITE}/#author` },
        inLanguage: LOCALES,
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: copy.title,
        description: copy.description,
        inLanguage: locale,
        isPartOf: { '@id': `${SITE}/#website` },
        primaryImageOfPage: `${SITE}/og-image.png`,
        about: [{ '@id': `${SITE}/#wordpress-plugin` }, { '@id': `${SITE}/#browser-extension` }],
        mainEntity: { '@id': `${url}#faq` },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE}/#wordpress-plugin`,
        name: 'AltVision – AI Alt Text Generator for WordPress',
        alternateName: 'Alt Text Manager',
        applicationCategory: 'WebApplication',
        applicationSubCategory: 'WordPress plugin',
        operatingSystem: 'WordPress',
        description: t.home.description,
        featureList: copy.wpFeatures.map(featureText),
        downloadUrl: WORDPRESS_URL,
        installUrl: WORDPRESS_URL,
        sameAs: [WORDPRESS_URL, GITHUB_URL],
        isAccessibleForFree: true,
        offers,
        author: { '@id': `${SITE}/#author` },
        inLanguage: locale,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE}/#browser-extension`,
        name: 'AltVision – AI Alt Text & Accessibility Browser Extension',
        applicationCategory: 'BrowserApplication',
        operatingSystem: 'Chrome, Firefox',
        description: t.home.description,
        featureList: copy.extFeatures.map(featureText),
        downloadUrl: [CHROME_URL, FIREFOX_URL],
        installUrl: CHROME_URL,
        sameAs: [CHROME_URL, FIREFOX_URL],
        isAccessibleForFree: true,
        offers,
        author: { '@id': `${SITE}/#author` },
        inLanguage: locale,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: locale,
        mainEntity: copy.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
};

// The text of the home page as plain semantic HTML, shown until React renders
const staticBody = (locale, t, copy) => {
  const h = t.home;
  const list = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
  const faqHref = (href) => (href.startsWith('/') ? `/${locale}${href}` : href);
  const reviews = (Array.isArray(h.reviews.items) ? h.reviews.items : [])
    .map((r) => `<blockquote>${r.title ? `<p><strong>${esc(r.title)}</strong></p>` : ''}<p>${esc(r.quote)}</p></blockquote>`)
    .join('');
  return `<div class="prerender">
<header><a href="/${locale}/"><strong>AltVision</strong></a></header>
<main>
<h1>${esc(h.hero.title)} <em>${esc(h.hero.titleHighlight)}</em></h1>
<p>${esc(h.description)}</p>
<p><a href="${WORDPRESS_URL}">${esc(h.hero.wpButton)}</a> · <a href="${CHROME_URL}">${esc(h.hero.chromeButton)}</a> · <a href="${FIREFOX_URL}">${esc(h.hero.firefoxButton)}</a></p>
<section><h2>${esc(h.wordpress.title)}</h2>${list(copy.wpFeatures)}<p><a href="${WORDPRESS_URL}">${esc(t.footer.downloadWP)}</a></p></section>
<section><h2>${esc(h.chrome.title)}</h2>${list(copy.extFeatures)}<p><a href="${CHROME_URL}">${esc(t.footer.downloadChrome)}</a> · <a href="${FIREFOX_URL}">${esc(t.footer.downloadFirefox)}</a></p></section>
<section><h2>${esc(h.reviews.title)}</h2>${reviews}</section>
<section><h2>${esc(h.faq.title)}</h2>${copy.faq
    .map(
      (i) =>
        `<h3>${esc(i.q)}</h3><p>${esc(i.a)}${i.href ? ` <a href="${esc(faqHref(i.href))}">${esc(i.linkText || i.href)}</a>` : ''}</p>`
    )
    .join('')}</section>
</main>
<footer>
<p><a href="/${locale}/terms">${esc(t.footer.termsOfUse)}</a> · <a href="/${locale}/privacy">${esc(t.footer.privacyPolicy)}</a> · <a href="${GITHUB_URL}">${esc(t.footer.openSource)}</a></p>
<nav aria-label="Languages"><ul>${LANGUAGES.map((l) => `<li><a href="/${l.code}/" hreflang="${l.code}" lang="${l.code}">${esc(l.name)}</a></li>`).join('')}</ul></nav>
</footer>
</div>`;
};

// Minimal styling so the pre-render reads as a page, not raw HTML, for the
// moment before the bundle runs
const PRERENDER_STYLE = `<style>.prerender{max-width:46rem;margin:0 auto;padding:2rem 1.5rem;font-family:Archivo,system-ui,sans-serif;color:#131C2B;background:#F4F7FC;line-height:1.6}.prerender h1,.prerender h2,.prerender h3{font-family:Fraunces,Georgia,serif;font-weight:500;line-height:1.15}.prerender a{color:#2F64B5}.prerender nav ul{display:flex;flex-wrap:wrap;gap:.25rem 1rem;list-style:none;padding:0}</style>`;

const hreflangLinks = () =>
  [
    ...LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="${homeUrl(l)}"/>`),
    `<link rel="alternate" hreflang="x-default" href="${homeUrl(DEFAULT_LOCALE)}"/>`,
  ].join('');

const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${esc(value)}"/>`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `${tag}</head>`);
};

const renderHead = (template, { locale, title, description, canonical, extraHead = '' }) => {
  let html = template
    .replace(/<html lang="[^"]*"[^>]*>/, `<html lang="${locale}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, 'name', 'description', description);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', description);
  html = setMeta(html, 'property', 'og:locale', locale);
  html = setMeta(html, 'property', 'og:site_name', 'AltVision');
  html = setMeta(html, 'name', 'twitter:url', canonical);
  html = setMeta(html, 'name', 'twitter:title', title);
  html = setMeta(html, 'name', 'twitter:description', description);
  return html.replace('</head>', `<link rel="canonical" href="${canonical}"/>${extraHead}</head>`);
};

const write = (rel, html) => {
  const file = path.join(BUILD, rel, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

// --- main ---
const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: build/index.html has no empty #root — was it already prerendered?');
}

const en = load(DEFAULT_LOCALE);

for (const locale of LOCALES) {
  const t = load(locale);
  const copy = pageCopy(t);
  const jsonLd = JSON.stringify(structuredData(locale, t, copy)).replace(/</g, '\\u003c');
  let html = renderHead(template, {
    locale,
    title: copy.title,
    description: copy.description,
    canonical: homeUrl(locale),
    extraHead: hreflangLinks() + PRERENDER_STYLE + `<script type="application/ld+json">${jsonLd}</script>`,
  });
  html = html.replace('<div id="root"></div>', `<div id="root">${staticBody(locale, t, copy)}</div>`);
  write(locale, html);

  // Terms and privacy are English-only, so every locale's copy points at the English one
  for (const page of ['terms', 'privacy']) {
    write(
      `${locale}/${page}`,
      renderHead(template, {
        locale: DEFAULT_LOCALE,
        title: `${en[page].title} – AltVision`,
        description: `${en[page].title} for AltVision, the AI alt text generator for WordPress, Chrome and Firefox.`,
        canonical: `${SITE}/${DEFAULT_LOCALE}/${page}`,
      })
    );
  }
}

// Unprefixed /terms and /privacy render the same English page
for (const page of ['terms', 'privacy']) {
  write(page, fs.readFileSync(path.join(BUILD, DEFAULT_LOCALE, page, 'index.html'), 'utf8'));
}

// The root shell (also nginx's fallback for unknown paths) carries English
// metadata and points search engines at /en/; the app redirects visitors to
// their own language.
const enCopy = pageCopy(en);
fs.writeFileSync(
  path.join(BUILD, 'index.html'),
  renderHead(template, {
    locale: DEFAULT_LOCALE,
    title: enCopy.title,
    description: enCopy.description,
    canonical: homeUrl(DEFAULT_LOCALE),
    extraHead: hreflangLinks(),
  })
);

// --- sitemap.xml ---
const alternates = hreflangLinks()
  .replace(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\/>/g, '\n    <xhtml:link rel="alternate" hreflang="$1" href="$2"/>');
const urls = [
  ...LOCALES.map(
    (l) => `  <url>\n    <loc>${homeUrl(l)}</loc>\n    <lastmod>${lastmod(`public/locales/${l}`, 'src')}</lastmod>${alternates}\n  </url>`
  ),
  `  <url>\n    <loc>${SITE}/en/terms</loc>\n    <lastmod>${lastmod('src/components/TermsOfUse.tsx')}</lastmod>\n  </url>`,
  `  <url>\n    <loc>${SITE}/en/privacy</loc>\n    <lastmod>${lastmod('src/components/PrivacyPolicy.tsx')}</lastmod>\n  </url>`,
];
fs.writeFileSync(
  path.join(BUILD, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
);

// --- llms.txt (https://llmstxt.org) — a plain-text brief for AI assistants ---
const h = en.home;
fs.writeFileSync(
  path.join(BUILD, 'llms.txt'),
  `# AltVision

> ${h.description}

AltVision is an AI alt text generator available as a WordPress plugin and as a browser extension for Chrome and Firefox. It writes image descriptions in 31 languages and supports WCAG 2.1 accessibility work. Free to try with a daily limit; premium removes the limit.

## Install

- [WordPress plugin](${WORDPRESS_URL}): ${h.wordpress.title}
- [Chrome extension](${CHROME_URL}): ${h.chrome.title}
- [Firefox add-on](${FIREFOX_URL}): ${h.chrome.title}
- [Source code (GitHub)](${GITHUB_URL}): the WordPress plugin is open source

## ${h.wordpress.title}

${enCopy.wpFeatures.map((f) => `- ${f}`).join('\n')}

## ${h.chrome.title}

${enCopy.extFeatures.map((f) => `- ${f}`).join('\n')}

## FAQ

${enCopy.faq.map((i) => `### ${i.q}\n\n${i.a}`).join('\n\n')}

## Pages

- [Home (English)](${homeUrl('en')})
- [Terms of use](${SITE}/en/terms)
- [Privacy policy](${SITE}/en/privacy)

## Languages

${LANGUAGES.map((l) => `- [${l.name}](${homeUrl(l.code)})`).join('\n')}
`
);

console.log(`prerender: ${LOCALES.length} locales, sitemap.xml (${urls.length} URLs), llms.txt`);
