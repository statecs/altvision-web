import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

// Aggregate rating as shown on the Google Business profile.
const RATING = 4.6;
const REVIEW_COUNT = 9;

// Structural data for each genuine review (from Google and the WordPress.org
// plugin directory). The review text lives in i18n under home.reviews.items,
// aligned to this list by index, so the quotes can be shown in the visitor's
// language. Names are never translated; dates are localised at render time.
// Sorted newest first.
type Review = {
  name: string;
  date: string; // ISO date, drives both the <time> value and the localised label
  source: 'google' | 'wordpress';
};

const reviews: Review[] = [
  { name: 'tarotfellow', date: '2026-06-21', source: 'wordpress' },
  { name: 'loloncio', date: '2026-02-23', source: 'wordpress' },
  { name: 'Grace Xu', date: '2025-12-05', source: 'google' },
  { name: 'Christiana Ben', date: '2025-11-21', source: 'google' },
  { name: 'David Max', date: '2025-11-14', source: 'google' },
  { name: 'Johnson Smith', date: '2025-10-06', source: 'google' },
  { name: 'Tobias Nyhuus Jensen', date: '2025-10-04', source: 'google' },
  { name: 'yoava', date: '2025-07-06', source: 'wordpress' },
];

type ReviewText = { quote: string; title?: string };

// A row of five stars with the rating partially filled via an overlay.
const StarRow = ({ rating, label }: { rating: number; label?: string }) => {
  const pct = (rating / 5) * 100;
  return (
    <div
      className="relative inline-flex"
      role="img"
      aria-label={label ?? `Rated ${rating} out of 5`}
    >
      <div className="flex text-ink/20">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={18} strokeWidth={1.5} className="fill-current" />
        ))}
      </div>
      <div className="absolute inset-0 flex overflow-hidden text-azure" style={{ width: `${pct}%` }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={18} strokeWidth={1.5} className="fill-current shrink-0" />
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { t, i18n } = useTranslation();

  const items = t('home.reviews.items', { returnObjects: true }) as ReviewText[];
  const texts = Array.isArray(items) ? items : [];

  // The original reviews are in English; when the UI is in another language we
  // show a translated version and flag it, the way Google labels translations.
  const baseLang = (i18n.language || 'en').split('-')[0];
  const isTranslated = baseLang !== 'en';

  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(i18n.language || 'en', {
        month: 'short',
        year: 'numeric',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <section className="pb-16" aria-labelledby="reviews-heading">
      <div className="max-w-6xl mx-auto">
        {/* Placard header with the aggregate Google rating */}
        <div className="border-b border-ink pb-6 mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-azure block mb-2">
              {t('home.reviews.label', 'Reviews')}
            </span>
            <h2 id="reviews-heading" className="font-display text-3xl md:text-4xl font-medium tracking-tight">
              {t('home.reviews.title', 'What people are saying')}
            </h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-display text-4xl font-medium leading-none">{RATING.toFixed(1)}</span>
            <div className="flex flex-col">
              <StarRow rating={RATING} label={`Rated ${RATING} out of 5 across ${REVIEW_COUNT} reviews`} />
              <span className="font-mono text-xs text-ink-soft mt-1">
                {t('home.reviews.ratingCaption', 'Based on {{count}} Google reviews', { count: REVIEW_COUNT })}
              </span>
            </div>
          </div>
        </div>

        {/* Masonry-ish review cards */}
        <ul className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {reviews.map((r, i) => {
            const text = texts[i] || { quote: '' };
            return (
              <li
                key={r.name}
                className="mb-6 break-inside-avoid rounded-lg border border-ink/12 bg-paper-deep/40 p-6 transition-colors hover:border-ink/30"
              >
                <StarRow rating={5} label="Rated 5 out of 5" />
                {text.title && (
                  <p className="font-display font-medium text-ink mt-3 leading-snug">{text.title}</p>
                )}
                <blockquote className={`text-ink/85 text-[15px] leading-relaxed ${text.title ? 'mt-2' : 'mt-3'}`}>
                  &ldquo;{text.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-display font-medium text-ink">{r.name}</span>
                    <span className="block font-mono text-xs text-ink-soft mt-0.5">
                      {r.source === 'wordpress'
                        ? t('home.reviews.verifiedWp', 'Verified WordPress.org review')
                        : t('home.reviews.verified', 'Verified Google review')}
                      {isTranslated && ` · ${t('home.reviews.translated', 'Translated')}`}
                    </span>
                  </div>
                  <time dateTime={r.date} className="font-mono text-xs text-ink/40 shrink-0">
                    {formatDate(r.date)}
                  </time>
                </figcaption>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
