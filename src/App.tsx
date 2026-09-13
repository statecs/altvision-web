import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Zap, Plug, FileImage, Accessibility, ScanSearch, Brain, Languages } from 'lucide-react';
import Footer from './components/Footer';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import LocaleRouter from './components/LocaleRouter';
import LanguageSelector from './components/LanguageSelector';
import ImageUploadDemo from './components/ImageUploadDemo';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import { trackEvent } from './analytics';
import { BROWSER_STORES, WORDPRESS_PLUGIN_URL } from './lib/stores';

// The AltVision eye — same lockup as the Chrome extension icon
const Logomark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#5B8FDC" />
    <path
      d="M0.4 12C4 6.6 8 4.6 12 4.6s8 2 11.6 7.4C20 17.4 16 19.4 12 19.4S4 17.4 0.4 12Z"
      fill="#FFFFFF"
    />
    <circle cx="12" cy="12" r="4.1" fill="#5B8FDC" />
  </svg>
);

// Navigation Component
const Navigation = () => {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-3.5 bg-paper/90 backdrop-blur-md border-b border-ink/10">
      <Link to="/" className="flex items-center gap-2.5 text-ink">
        <Logomark />
        <span className="font-display font-semibold text-lg tracking-tight">AltVision</span>
      </Link>
      <LanguageSelector />
    </header>
  );
};

// Decorative marquee of alt text in different languages — reinforces the 31-language support
const altSamples = [
  ['en', 'A cyclist crossing a rain-soaked street at dusk'],
  ['sv', 'En röd stuga vid en stilla sjö'],
  ['fr', 'Un chat endormi sur une pile de livres'],
  ['de', 'Ein Leuchtturm an einer felsigen Küste'],
  ['es', 'Dos tazas de café sobre una mesa de madera'],
  ['ja', '桜の木の下で読書する女性'],
  ['ar', 'قارب صغير يبحر عند الغروب'],
  ['pt', 'Crianças a empinar papagaios na praia'],
];

const AltMarquee = () => {
  const [stopped, setStopped] = useState(false);
  return (
  <div
    aria-hidden="true"
    onClick={() => setStopped((v) => !v)}
    className="group relative left-1/2 -translate-x-1/2 w-screen overflow-hidden border-y border-ink/15 bg-paper-deep/60 -rotate-1 my-14 cursor-pointer select-none"
  >
    <div
      className={`flex w-max animate-marquee whitespace-nowrap py-3 group-hover:[animation-play-state:paused] ${
        stopped ? '[animation-play-state:paused]' : ''
      }`}
    >
      {[0, 1].map((dup) => (
        <div key={dup} className="flex shrink-0">
          {altSamples.map(([code, text]) => (
            <span key={`${dup}-${code}`} className="font-mono text-sm text-ink-soft mx-6">
              <span className="text-ink/40 uppercase mr-2">{code}</span>
              <span className="text-azure">alt="</span>
              {text}
              <span className="text-azure">"</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
  );
};

// Home Page
const HomePage = () => {
  const { t } = useTranslation();
  const [descExpanded, setDescExpanded] = useState(false);
  const fullDesc = t('home.description');
  const firstSentenceEnd = fullDesc.search(/[.!?]\s/);
  const preview = firstSentenceEnd !== -1 ? fullDesc.slice(0, firstSentenceEnd + 1) : fullDesc;
  const remainder = firstSentenceEnd !== -1 ? fullDesc.slice(firstSentenceEnd + 2) : '';

  const wpFeatures = [
    { icon: Zap, key: 'home.wordpress.oneClick' },
    { icon: Plug, key: 'home.wordpress.wpReady' },
    { icon: FileImage, key: 'home.wordpress.formatSupport' },
    { icon: Accessibility, key: 'home.wordpress.accessibility' },
  ];
  const chromeFeatures = [
    { icon: ScanSearch, key: 'home.chrome.altTextDetection' },
    { icon: Brain, key: 'home.chrome.contextAware' },
    { icon: Languages, key: 'home.chrome.multipleLanguages' },
  ];

  return (
    <div className="container mx-auto px-6">
      <section className="pt-16 md:pt-24" aria-label="Hero section">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left column: headline + CTAs */}
          <div className="order-1">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
              {t('nav.wordpressPlugin')} · {t('nav.browserExtension')}
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-medium mb-8 leading-[1.05] tracking-tight animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
              {t('home.hero.title')}{' '}
              <em className="text-azure font-normal">{t('home.hero.titleHighlight')}</em>
            </h1>
            <div className="flex flex-wrap gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <a
                href={WORDPRESS_PLUGIN_URL}
                rel="noopener noreferrer"
                className="bg-ink text-paper px-6 py-3 rounded-md font-medium shadow-[4px_4px_0_#5B8FDC] hover:shadow-[2px_2px_0_#5B8FDC] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                onClick={() => trackEvent('cta_click', { label: 'wordpress_plugin' })}
              >
                {t('home.hero.wpButton')}
              </a>
              {BROWSER_STORES.map((store) => (
                <a
                  key={store.id}
                  href={store.url}
                  rel="noopener noreferrer"
                  className="border border-ink/30 text-ink px-6 py-3 rounded-md font-medium hover:border-ink hover:bg-ink/5 transition-all"
                  onClick={() => trackEvent('cta_click', { label: store.trackLabel })}
                >
                  {t(store.labelKey)}
                </a>
              ))}
            </div>
          </div>

          {/* Right column: demo widget */}
          <div className="order-2 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
            <ImageUploadDemo />
          </div>
        </div>
      </section>

      <AltMarquee />

      <section className="pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display text-xl md:text-2xl leading-relaxed text-ink/80 mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
            {preview}
            {!descExpanded && remainder && (
              <>
                {' '}
                <button
                  onClick={() => setDescExpanded(true)}
                  className="font-sans text-base text-azure underline underline-offset-4 hover:text-azure-deep transition-colors cursor-pointer"
                >
                  {t('common.readMore', 'read more')}
                </button>
              </>
            )}
            {descExpanded && remainder && ` ${remainder}`}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-14 max-w-6xl mx-auto mt-16">
          {/* WordPress column */}
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.8s' }}>
            <div className="border-b border-ink pb-4 mb-2">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-azure block mb-2">
                {t('nav.wordpressPlugin')}
              </span>
              <h2 className="font-display text-3xl font-medium tracking-tight">{t('home.wordpress.title')}</h2>
            </div>
            <ul>
              {wpFeatures.map(({ icon: Icon, key }, i) => (
                <li key={key} className="group flex items-start gap-5 py-5 border-b border-ink/10 hover:bg-paper-deep/50 hover:px-3 transition-all">
                  <span className="font-mono text-xs text-ink/40 pt-1 group-hover:text-azure transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon size={20} strokeWidth={1.75} className="shrink-0 mt-0.5 text-ink" aria-hidden="true" />
                  <span className="text-ink/80 text-[15px] leading-relaxed">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Browser extension column */}
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '1s' }}>
            <div className="border-b border-ink pb-4 mb-2">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-azure block mb-2">
                {t('nav.browserExtension')}
              </span>
              <h2 className="font-display text-3xl font-medium tracking-tight">{t('home.chrome.title')}</h2>
            </div>
            <ul>
              {chromeFeatures.map(({ icon: Icon, key }, i) => (
                <li key={key} className="group flex items-start gap-5 py-5 border-b border-ink/10 hover:bg-paper-deep/50 hover:px-3 transition-all">
                  <span className="font-mono text-xs text-ink/40 pt-1 group-hover:text-azure transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon size={20} strokeWidth={1.75} className="shrink-0 mt-0.5 text-ink" aria-hidden="true" />
                  <span className="text-ink/80 text-[15px] leading-relaxed">{t(key)}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-5 font-mono text-sm">
              {BROWSER_STORES.map((store) => (
                <a
                  key={store.id}
                  href={store.url}
                  rel="noopener noreferrer"
                  className="text-azure hover:text-azure-deep underline underline-offset-4 transition-colors"
                  onClick={() => trackEvent('cta_click', { label: store.trackLabel })}
                >
                  {t(store.labelKey)} →
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <FAQ />

      <Footer />
    </div>
  );
};

// Terms Page
const TermsPage = () => (
  <TermsOfUse />
);

// Privacy Page
const PrivacyPage = () => (
  <PrivacyPolicy />
);

// Main App Component
const App = () => {
  return (
    <BrowserRouter>
      <div className="grain min-h-screen bg-paper text-ink overflow-x-clip">
        <Navigation />
        <Routes>
          {/* Locale-aware routes */}
          <Route path="/:locale" element={<LocaleRouter><HomePage /></LocaleRouter>} />
          <Route path="/:locale/terms" element={<LocaleRouter><TermsPage /></LocaleRouter>} />
          <Route path="/:locale/privacy" element={<LocaleRouter><PrivacyPage /></LocaleRouter>} />
          {/* Backward compat / redirects */}
          <Route path="/" element={<LocaleRouter><HomePage /></LocaleRouter>} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
