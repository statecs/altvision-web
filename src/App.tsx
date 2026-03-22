import React from 'react';
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
    <header className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <span className="font-semibold">AltVision</span>
      </Link>
      <LanguageSelector />
    </header>
  );
};

// Home Page
const HomePage = () => {
  const { t } = useTranslation();

  return (
  <div className="container mx-auto px-4">
  <section className="pt-16" aria-label="Hero section">
    {/* Two-column layout on desktop, stacked on mobile */}
    <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
      {/* Left column: headline + CTAs (shown first on desktop, first on mobile) */}
      <div className="order-1">
        <h1 className="text-4xl font-bold mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
          {t('home.hero.title')}<br />{t('home.hero.titleHighlight')}
        </h1>
        <div className="flex flex-wrap gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
          <a
            href="https://wordpress.org/plugins/altvision-ai-alt-text-generator/"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {t('home.hero.wpButton')}
          </a>
          <a
            href="https://chromewebstore.google.com/detail/altvision/iogpbgncdhijknmmhkllijfaioecfcoa"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-300 mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
            {t('home.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-16">
          <div className="space-y-8 animate-slide-up opacity-0" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-2xl font-bold text-blue-400">{t('home.wordpress.title')}</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">🎯</span>
                <span>{t('home.wordpress.oneClick')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔌</span>
                <span>{t('home.wordpress.wpReady')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎨</span>
                <span>{t('home.wordpress.formatSupport')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔒</span>
                <span>{t('home.wordpress.accessibility')}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-8 animate-slide-up opacity-0" style={{ animationDelay: '1s' }}>
            <h2 className="text-2xl font-bold text-blue-400">{t('home.chrome.title')}</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">🔍</span>
                <span>{t('home.chrome.altTextDetection')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🧠</span>
                <span>{t('home.chrome.contextAware')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🌍</span>
                <span>{t('home.chrome.multipleLanguages')}</span>
              </li>
            </ul>
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
