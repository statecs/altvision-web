import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left side */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('footer.downloadAltVision')}
            </h2>
            <div className="flex flex-col gap-4 items-start">
              <a
                href="https://wordpress.org/plugins/altvision-ai-alt-text-generator/"
                rel="noopener noreferrer"
                className="bg-black text-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-gray-800 transition-colors w-fit"
              >
                {t('footer.downloadWP')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://chromewebstore.google.com/detail/altvision/iogpbgncdhijknmmhkllijfaioecfcoa"
                rel="noopener noreferrer"
                className="bg-black text-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-gray-800 transition-colors w-fit"
              >
                {t('footer.downloadChrome')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right side - Links */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.termsOfUse')}
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.privacyPolicy')}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-sm">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
