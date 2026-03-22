import React from 'react';
import { ArrowRight, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/5 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left side */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 shadow-sm shadow-blue-500/50"></div>
              <span className="font-semibold tracking-tight">AltVision</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('footer.downloadAltVision')}
            </h2>
            <div className="flex flex-col gap-4 items-start">
              <a
                href="https://wordpress.org/plugins/altvision-ai-alt-text-generator/"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white px-6 py-3 rounded-xl text-sm font-medium inline-flex items-center gap-2 transition-all shadow-lg shadow-blue-700/30 w-fit"
              >
                {t('footer.downloadWP')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://chromewebstore.google.com/detail/altvision/iogpbgncdhijknmmhkllijfaioecfcoa"
                rel="noopener noreferrer"
                className="border border-blue-500/50 text-blue-300 hover:border-blue-400 hover:bg-blue-500/10 px-6 py-3 rounded-xl text-sm font-medium inline-flex items-center gap-2 transition-all w-fit"
              >
                {t('footer.downloadChrome')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right side - Links */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <a href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">
              {t('footer.termsOfUse')}
            </a>
            <a href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">
              {t('footer.privacyPolicy')}
            </a>
            <a
              href="https://github.com/statecs/AltVision-plugin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              {t('footer.openSource')}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 mt-4 text-gray-500 text-sm">
          © Copyright {new Date().getFullYear()}{' '}
          <a
            href="https://cstate.se"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            Christopher State
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
