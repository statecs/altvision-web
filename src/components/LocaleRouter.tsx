import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LocaleRouterProps {
  children: React.ReactNode;
}

const LocaleRouter: React.FC<LocaleRouterProps> = ({ children }) => {
  const { locale } = useParams<{ locale?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const [isInitialized, setIsInitialized] = React.useState(false);

  const supportedLocales = ['ar','bn','cs','da','de','el','en','es','fi','fr','he','hi','hu','id','it','ja','ko','nl','no','pl','pt','ro','ru','sv','ta','th','tr','uk','ur','vi','zh'];

  useEffect(() => {
    let shouldRender = true;

    // If we have a locale in the URL
    if (locale) {
      if (supportedLocales.includes(locale)) {
        if (i18n.language !== locale) {
          i18n.changeLanguage(locale);
        }
        shouldRender = true;
      } else {
        // Redirect to default locale if unsupported locale in URL
        const pathWithoutLocale = location.pathname.replace(`/${locale}`, '') || '/';
        navigate(`/en${pathWithoutLocale}`, { replace: true });
        shouldRender = false;
      }
    } else {
      // If no locale in URL, detect and redirect
      const detectedLanguage = i18n.language;
      const targetLocale = supportedLocales.includes(detectedLanguage) ? detectedLanguage : 'en';

      // Only redirect if we're not already on the root path of the detected language
      if (location.pathname === '/' || !location.pathname.startsWith(`/${targetLocale}`)) {
        const newPath = location.pathname === '/' ? `/${targetLocale}/` : `/${targetLocale}${location.pathname}`;
        navigate(newPath, { replace: true });
        shouldRender = false;
      }
    }

    // Mark as initialized after processing
    setIsInitialized(true);
  }, [locale, i18n, navigate, location, supportedLocales]);

  // Don't render children until we've handled the locale routing
  // Always render if we have a valid locale
  if (locale && supportedLocales.includes(locale) && isInitialized) {
    return <>{children}</>;
  }

  // Show minimal loading state while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Invalid locale case - let the navigation redirect handle it
  return null;
};

export default LocaleRouter;
