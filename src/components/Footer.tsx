import React from 'react';
import { ArrowRight, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BROWSER_STORES, WORDPRESS_PLUGIN_URL } from '../lib/stores';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative left-1/2 -translate-x-1/2 w-screen bg-ink text-paper mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left side */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50 mb-4">AltVision</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-8">
              {t('footer.downloadAltVision')}
            </h2>
            <div className="flex flex-col gap-4 items-start">
              <a
                href={WORDPRESS_PLUGIN_URL}
                rel="noopener noreferrer"
                className="bg-azure hover:bg-azure-deep text-white px-6 py-3 rounded-md text-sm font-semibold inline-flex items-center gap-2 transition-colors w-fit"
              >
                {t('footer.downloadWP')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex flex-wrap gap-3">
                {BROWSER_STORES.map((store) => (
                  <a
                    key={store.id}
                    href={store.url}
                    rel="noopener noreferrer"
                    className="border border-paper/30 text-paper hover:border-paper hover:bg-paper/10 px-6 py-3 rounded-md text-sm font-medium inline-flex items-center gap-2 transition-all w-fit"
                  >
                    {t(store.id === 'chrome' ? 'footer.downloadChrome' : 'footer.downloadFirefox')}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Links */}
          <div className="flex flex-col items-start md:items-end md:justify-end gap-4">
            <a href="/terms" className="font-mono text-sm text-paper/60 hover:text-paper transition-colors">
              {t('footer.termsOfUse')}
            </a>
            <a href="/privacy" className="font-mono text-sm text-paper/60 hover:text-paper transition-colors">
              {t('footer.privacyPolicy')}
            </a>
            <a
              href="https://github.com/statecs/AltVision-plugin"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-paper/60 hover:text-paper transition-colors inline-flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              {t('footer.openSource')}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-paper/15 pt-8 mt-4 text-paper/50 text-sm">
          © Copyright {new Date().getFullYear()}{' '}
          <a
            href="https://cstate.se"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-paper transition-colors"
          >
            Christopher State
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
