import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from './components/Footer';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import LocaleRouter from './components/LocaleRouter';
import LanguageSelector from './components/LanguageSelector';
import placeholder from './images/placeholder.png';
import placeholder1 from './images/placeholder-1.png';

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
  const [currentImage, setCurrentImage] = React.useState(0);
  const images = [placeholder, placeholder1];

  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, images.length]);

  return (
  <div className="container mx-auto px-4">
  <section className="pt-16 text-center" aria-label="Hero section">
    <h1 className="text-4xl font-bold mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
      {t('home.hero.title')}<br />{t('home.hero.titleHighlight')}
    </h1>
    <div className="mx-2 flex gap-4 justify-center">
      <a
          href="https://wordpress.org/plugins/altvision-ai-alt-text-generator/"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium mt-4 animate-slide-up opacity-0 hover:bg-blue-700 transition-colors"
          style={{ animationDelay: '0.4s' }}
        >
          {t('home.hero.wpButton')}
        </a>
        <a
          href="https://chromewebstore.google.com/detail/altvision/iogpbgncdhijknmmhkllijfaioecfcoa"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium mt-4 animate-slide-up opacity-0 hover:bg-blue-700 transition-colors"
          style={{ animationDelay: '0.4s' }}
        >
          {t('home.hero.chromeButton')}
        </a>
      </div>

      <div className="mt-12 relative w-screen md:w-full -mx-4 md:mx-auto h-[600px] md:h-[800px]">
      <div
        className="h-full animate-slide-up opacity-0 md:p-4 md:max-w-[1200px] md:mx-auto relative"
        style={{ animationDelay: '0.6s' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {[placeholder, placeholder1].map((image, index) => (
          <img
            key={index}
            src={image}
            alt={t('home.hero.imageAlt')}
            className={`
              absolute top-0 left-0 w-full h-full object-cover rounded-none md:rounded-2xl
              transition-opacity duration-1000
              ${index === currentImage ? 'opacity-100' : 'opacity-0'}
            `}
          />
        ))}
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
