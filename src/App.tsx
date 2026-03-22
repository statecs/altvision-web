import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from './components/Footer';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import LocaleRouter from './components/LocaleRouter';
import LanguageSelector from './components/LanguageSelector';
import ImageUploadDemo from './components/ImageUploadDemo';

// Navigation Component
const Navigation = () => {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 backdrop-blur-md bg-gray-900/80 border-b border-white/5">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 shadow-sm shadow-blue-500/50"></div>
        <span className="font-semibold tracking-tight">AltVision</span>
      </Link>
      <LanguageSelector />
    </header>
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

  return (
  <div className="container mx-auto px-4">
  <section className="pt-16" aria-label="Hero section">
    {/* Two-column layout on desktop, stacked on mobile */}
    <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
      {/* Left column: headline + CTAs (shown first on desktop, first on mobile) */}
      <div className="order-1">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
          {t('home.hero.title')}<br />
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            {t('home.hero.titleHighlight')}
          </span>
        </h1>
        <div className="flex flex-wrap gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
          <a
            href="https://wordpress.org/plugins/altvision-ai-alt-text-generator/"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-700/30"
          >
            {t('home.hero.wpButton')}
          </a>
          <a
            href="https://chromewebstore.google.com/detail/altvision/iogpbgncdhijknmmhkllijfaioecfcoa"
            rel="noopener noreferrer"
            className="border border-blue-500/50 text-blue-300 hover:border-blue-400 hover:bg-blue-500/10 px-6 py-3 rounded-xl font-medium transition-all"
          >
            {t('home.hero.chromeButton')}
          </a>
        </div>
      </div>

      {/* Right column: demo widget */}
      <div className="order-2 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
        <ImageUploadDemo />
      </div>
    </div>
  </section>

  <section className="py-16">
    <div className="max-w-xl mx-auto text-center">
      <div className="h-px w-32 mx-auto mb-10 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
      <p className="text-base leading-relaxed text-gray-500 mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
        {preview}
        {!descExpanded && remainder && (
          <>
            {' '}
            <button
              onClick={() => setDescExpanded(true)}
              className="text-gray-400 underline underline-offset-2 hover:text-gray-200 transition-colors cursor-pointer"
            >
              {t('common.readMore', 'read more')}
            </button>
          </>
        )}
        {descExpanded && remainder && ` ${remainder}`}
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-16">
      {/* WordPress column */}
      <div className="animate-slide-up opacity-0 rounded-3xl border border-blue-500/10 bg-gradient-to-b from-blue-500/5 to-transparent p-6" style={{ animationDelay: '0.8s' }}>
        <div className="mb-6">
          <span className="inline-flex items-center text-xs font-semibold tracking-wide px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20 mb-3">
            WordPress Plugin
          </span>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{t('home.wordpress.title')}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '🎯', key: 'home.wordpress.oneClick' },
            { icon: '🔌', key: 'home.wordpress.wpReady' },
            { icon: '🎨', key: 'home.wordpress.formatSupport' },
            { icon: '🔒', key: 'home.wordpress.accessibility' },
          ].map(({ icon, key }) => (
            <div key={key} className="group bg-gray-900/60 border border-gray-700/40 rounded-2xl p-4 flex flex-col gap-3 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all backdrop-blur-sm">
              <span className="bg-gradient-to-br from-blue-500/20 to-violet-500/10 rounded-xl p-2.5 text-xl w-fit ring-1 ring-white/5 group-hover:ring-blue-500/20 transition-all">{icon}</span>
              <span className="text-gray-300 text-sm leading-snug">{t(key)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chrome column */}
      <div className="animate-slide-up opacity-0 rounded-3xl border border-violet-500/10 bg-gradient-to-b from-violet-500/5 to-transparent p-6" style={{ animationDelay: '1s' }}>
        <div className="mb-6">
          <span className="inline-flex items-center text-xs font-semibold tracking-wide px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20 mb-3">
            Chrome Extension
          </span>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{t('home.chrome.title')}</h2>
        </div>
        <div className="space-y-3">
          {[
            { icon: '🔍', key: 'home.chrome.altTextDetection' },
            { icon: '🧠', key: 'home.chrome.contextAware' },
            { icon: '🌍', key: 'home.chrome.multipleLanguages' },
          ].map(({ icon, key }) => (
            <div key={key} className="group bg-gray-900/60 border border-gray-700/40 rounded-2xl p-4 flex items-center gap-3 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all backdrop-blur-sm">
              <span className="bg-gradient-to-br from-violet-500/20 to-purple-500/10 rounded-xl p-2.5 text-xl flex-shrink-0 ring-1 ring-white/5 group-hover:ring-violet-500/20 transition-all">{icon}</span>
              <span className="text-gray-300 text-sm leading-snug">{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>



    <Footer />
  </div>
  )
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
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl" />
        </div>
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
