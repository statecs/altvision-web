import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';

const f = (children: React.ReactNode) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" width="20" height="15" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    {children}
  </svg>
);

const languages: { code: string; name: string; flag: React.ReactNode }[] = [
  { code: 'en', name: 'English', flag: f(<><rect width="20" height="15" fill="#B22234"/><rect y="1.15" width="20" height="1.15" fill="#fff"/><rect y="3.46" width="20" height="1.15" fill="#fff"/><rect y="5.77" width="20" height="1.15" fill="#fff"/><rect y="8.08" width="20" height="1.15" fill="#fff"/><rect y="10.38" width="20" height="1.15" fill="#fff"/><rect y="12.69" width="20" height="1.15" fill="#fff"/><rect width="8" height="8.08" fill="#3C3B6E"/></>) },
  { code: 'es', name: 'Español', flag: f(<><rect width="20" height="15" fill="#c60b1e"/><rect y="3.75" width="20" height="7.5" fill="#ffc400"/></>) },
  { code: 'fr', name: 'Français', flag: f(<><rect width="20" height="15" fill="#ED2939"/><rect width="13.33" height="15" fill="#fff"/><rect width="6.67" height="15" fill="#002395"/></>) },
  { code: 'de', name: 'Deutsch', flag: f(<><rect width="20" height="15" fill="#FFCE00"/><rect width="20" height="10" fill="#D00"/><rect width="20" height="5" fill="#000"/></>) },
  { code: 'pt', name: 'Português', flag: f(<><rect width="20" height="15" fill="#FF0000"/><rect width="8" height="15" fill="#006600"/></>) },
  { code: 'vi', name: 'Tiếng Việt', flag: f(<><rect width="20" height="15" fill="#DA251D"/><polygon points="10,3 11.18,6.64 15,6.64 11.91,8.86 13.09,12.5 10,10.28 6.91,12.5 8.09,8.86 5,6.64 8.82,6.64" fill="#FFFF00"/></>) },
  { code: 'sv', name: 'Svenska', flag: f(<><rect width="20" height="15" fill="#006AA7"/><rect x="6" width="2.5" height="15" fill="#FECC02"/><rect y="6.25" width="20" height="2.5" fill="#FECC02"/></>) },
  { code: 'ro', name: 'Română', flag: f(<><rect width="20" height="15" fill="#FCD116"/><rect width="13.33" height="15" fill="#fff"/><rect x="13.33" width="6.67" height="15" fill="#002B7F"/><rect width="6.67" height="15" fill="#002B7F"/></>) },
  { code: 'ar', name: 'العربية', flag: f(<><rect width="20" height="15" fill="#006C35"/><rect y="5" width="20" height="5" fill="#fff"/></>) },
  { code: 'bn', name: 'বাংলা', flag: f(<><rect width="20" height="15" fill="#006A4E"/><circle cx="9" cy="7.5" r="4" fill="#F42A41"/></>) },
  { code: 'cs', name: 'Čeština', flag: f(<><rect width="20" height="15" fill="#D7141A"/><rect width="20" height="7.5" fill="#fff"/><polygon points="0,0 8,7.5 0,15" fill="#11457E"/></>) },
  { code: 'da', name: 'Dansk', flag: f(<><rect width="20" height="15" fill="#C60C30"/><rect x="6" width="2.5" height="15" fill="#fff"/><rect y="6.25" width="20" height="2.5" fill="#fff"/></>) },
  { code: 'el', name: 'Ελληνικά', flag: f(<><rect width="20" height="15" fill="#0D5EAF"/><rect width="20" height="1.67" fill="#fff"/><rect y="3.33" width="20" height="1.67" fill="#fff"/><rect y="6.67" width="20" height="1.67" fill="#fff"/><rect y="10" width="20" height="1.67" fill="#fff"/><rect y="13.33" width="20" height="1.67" fill="#fff"/><rect width="8" height="8.33" fill="#0D5EAF"/><rect x="3" width="2" height="8.33" fill="#fff"/><rect y="3.17" width="8" height="2" fill="#fff"/></>) },
  { code: 'fi', name: 'Suomi', flag: f(<><rect width="20" height="15" fill="#fff"/><rect x="5" width="3" height="15" fill="#003580"/><rect y="6" width="20" height="3" fill="#003580"/></>) },
  { code: 'he', name: 'עברית', flag: f(<><rect width="20" height="15" fill="#fff"/><rect y="2" width="20" height="2.5" fill="#0038B8"/><rect y="10.5" width="20" height="2.5" fill="#0038B8"/><polygon points="10,5 12.6,9.5 7.4,9.5" fill="none" stroke="#0038B8" strokeWidth="1"/><polygon points="10,10 7.4,5.5 12.6,5.5" fill="none" stroke="#0038B8" strokeWidth="1"/></>) },
  { code: 'hi', name: 'हिन्दी', flag: f(<><rect width="20" height="15" fill="#138808"/><rect width="20" height="10" fill="#fff"/><rect width="20" height="5" fill="#FF9933"/><circle cx="10" cy="7.5" r="2.5" fill="none" stroke="#000080" strokeWidth="0.5"/></>) },
  { code: 'hu', name: 'Magyar', flag: f(<><rect width="20" height="15" fill="#477050"/><rect width="20" height="10" fill="#fff"/><rect width="20" height="5" fill="#CE2939"/></>) },
  { code: 'id', name: 'Bahasa Indonesia', flag: f(<><rect width="20" height="15" fill="#fff"/><rect width="20" height="7.5" fill="#CE1126"/></>) },
  { code: 'it', name: 'Italiano', flag: f(<><rect width="20" height="15" fill="#CE2B37"/><rect width="13.33" height="15" fill="#fff"/><rect width="6.67" height="15" fill="#009246"/></>) },
  { code: 'ja', name: '日本語', flag: f(<><rect width="20" height="15" fill="#fff"/><circle cx="10" cy="7.5" r="4" fill="#BC002D"/></>) },
  { code: 'ko', name: '한국어', flag: f(<><rect width="20" height="15" fill="#fff"/><circle cx="10" cy="7.5" r="3.5" fill="#CD2E3A"/><path d="M10,4 A3.5,3.5 0 0,1 10,11" fill="#003478"/></>) },
  { code: 'nl', name: 'Nederlands', flag: f(<><rect width="20" height="15" fill="#174190"/><rect width="20" height="10" fill="#fff"/><rect width="20" height="5" fill="#AE1C28"/></>) },
  { code: 'no', name: 'Norsk', flag: f(<><rect width="20" height="15" fill="#EF2B2D"/><rect x="6" width="2.5" height="15" fill="#fff"/><rect y="6.25" width="20" height="2.5" fill="#fff"/><rect x="6.5" width="1.5" height="15" fill="#002868"/><rect y="6.75" width="20" height="1.5" fill="#002868"/></>) },
  { code: 'pl', name: 'Polski', flag: f(<><rect width="20" height="15" fill="#fff"/><rect y="7.5" width="20" height="7.5" fill="#DC143C"/></>) },
  { code: 'ru', name: 'Русский', flag: f(<><rect width="20" height="15" fill="#0039A6"/><rect width="20" height="10" fill="#fff"/><rect width="20" height="5" fill="#D52B1E"/></>) },
  { code: 'ta', name: 'தமிழ்', flag: f(<><rect width="20" height="15" fill="#138808"/><rect width="20" height="10" fill="#fff"/><rect width="20" height="5" fill="#FF9933"/><circle cx="10" cy="7.5" r="2.5" fill="none" stroke="#000080" strokeWidth="0.5"/></>) },
  { code: 'th', name: 'ภาษาไทย', flag: f(<><rect width="20" height="15" fill="#A51931"/><rect y="2.5" width="20" height="10" fill="#fff"/><rect y="5" width="20" height="5" fill="#2D2A4A"/></>) },
  { code: 'tr', name: 'Türkçe', flag: f(<><rect width="20" height="15" fill="#E30A17"/><circle cx="8.5" cy="7.5" r="3" fill="#fff"/><circle cx="9.8" cy="7.5" r="2.4" fill="#E30A17"/><polygon points="13,7.5 14.5,6 14.5,9" fill="#fff"/></>) },
  { code: 'uk', name: 'Українська', flag: f(<><rect width="20" height="15" fill="#FFD700"/><rect width="20" height="7.5" fill="#005BBB"/></>) },
  { code: 'ur', name: 'اردو', flag: f(<><rect width="20" height="15" fill="#01411C"/><rect width="5" height="15" fill="#fff"/><circle cx="12" cy="7.5" r="3" fill="none" stroke="#fff" strokeWidth="1.2"/><circle cx="13.2" cy="7.5" r="2.4" fill="#01411C"/><polygon points="16,7.5 17,6.5 17,8.5" fill="#fff"/></>) },
  { code: 'zh', name: '中文', flag: f(<><rect width="20" height="15" fill="#DE2910"/><polygon points="3,1.5 3.6,3.35 5.5,3.35 4.1,4.5 4.6,6.35 3,5.2 1.4,6.35 1.9,4.5 0.5,3.35 2.4,3.35" fill="#FFDE00"/></>) },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    // Update the URL to reflect the new language
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment);

    // Check if the first segment is a language code
    const supportedLanguages = languages.map(lang => lang.code);
    const hasLocaleInPath = pathSegments.length > 0 && supportedLanguages.includes(pathSegments[0]);

    let newPath;
    if (hasLocaleInPath) {
      // Replace the existing locale
      pathSegments[0] = languageCode;
      newPath = `/${pathSegments.join('/')}`;
    } else {
      // Add locale to the beginning
      newPath = `/${languageCode}${currentPath}`;
    }

    // Ensure the path ends with / for the home page
    if (newPath === `/${languageCode}`) {
      newPath = `/${languageCode}/`;
    }

    navigate(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-gray-800"
      >
        <Globe size={16} />
        <span className="text-sm">{currentLanguage.flag}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center space-x-3 ${
                  currentLanguage.code === language.code
                    ? 'text-blue-400 bg-gray-700'
                    : 'text-gray-300'
                }`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
                {currentLanguage.code === language.code && (
                  <span className="ml-auto text-blue-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;
