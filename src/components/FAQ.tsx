import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';

type FaqItem = {
  q: string;
  a: string;
  href?: string;
  linkText?: string;
};

const FAQ = () => {
  const { t } = useTranslation();
  const items = t('home.faq.items', { returnObjects: true }) as FaqItem[];
  const list = Array.isArray(items) ? items : [];

  return (
    <section className="pb-8" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-azure block mb-3">
            {t('home.faq.label', 'FAQ')}
          </span>
          <h2 id="faq-heading" className="font-display text-3xl md:text-4xl font-medium tracking-tight">
            {t('home.faq.title', 'Frequently asked questions')}
          </h2>
          <p className="text-ink/70 mt-4">
            {t('home.faq.subtitle', 'Everything you need to know about AltVision.')}
          </p>
        </div>

        <Accordion.Root type="single" collapsible className="border-t border-ink/15">
          {list.map((item, i) => (
            <Accordion.Item
              key={i}
              value={`item-${i}`}
              className="border-b border-ink/15"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-azure [&[data-state=open]]:text-azure">
                  <span className="font-display text-lg font-medium tracking-tight">{item.q}</span>
                  <Plus
                    size={20}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="shrink-0 text-ink/40 transition-transform duration-200 group-hover:text-azure group-data-[state=open]:rotate-45"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="pb-6 pr-8 text-ink/75 text-[15px] leading-relaxed">
                  {item.a}
                  {item.href && (
                    <>
                      {' '}
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-azure underline underline-offset-4 hover:text-azure-deep transition-colors"
                      >
                        {item.linkText || item.href}
                      </a>
                    </>
                  )}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
};

export default FAQ;
