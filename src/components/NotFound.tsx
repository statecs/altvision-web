import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supportedLocales } from './LocaleRouter';

// Unknown paths get the app shell from the server with a 200, so tell
// crawlers not to index them instead of leaving a blank page that looks
// like a duplicate of the home page. Also used by missing guides.
export const useNoindex = (active = true) => {
  useEffect(() => {
    if (!active) return;
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    canonical?.remove();
    return () => {
      meta.remove();
      if (canonical) document.head.appendChild(canonical);
    };
  }, [active]);
};

const NotFound = () => {
  const { t, i18n } = useTranslation();
  // Keep the visitor in their language: /ar/missing links to /ar/guides/.
  const locale = supportedLocales.includes(i18n.language) ? i18n.language : 'en';
  useNoindex();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Page not found – AltVision';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="container mx-auto px-6 py-24 max-w-2xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft mb-6">404</p>
      <h1 className="font-display text-4xl md:text-5xl font-medium mb-6 tracking-tight">
        {t('notFound.title', 'Page not found')}
      </h1>
      <p className="text-ink/70 mb-10">
        {t('notFound.body', 'The page you were looking for doesn’t exist or has moved.')}
      </p>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-sm">
        <Link to="/" className="text-azure hover:text-azure-deep underline underline-offset-4">
          {t('notFound.home', 'Go to the home page')} →
        </Link>
        <Link to={`/${locale}/guides/`} className="text-azure hover:text-azure-deep underline underline-offset-4">
          {t('notFound.guides', 'Read the alt text guides')} →
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
