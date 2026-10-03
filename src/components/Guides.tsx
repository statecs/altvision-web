import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from './Footer';
import guides from '../content/guides.json';

// Guides are written in English only; scripts/prerender.js renders the same
// JSON to static HTML for crawlers, so keep the block types in step with it.
type Block =
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { code: string }
  | { examples: { context: string; bad: string; good: string }[] };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated: string;
  summary: string;
  sections: { heading: string; blocks: Block[] }[];
  faq: { q: string; a: string }[];
};

export const GUIDES = guides as Guide[];

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// **bold**, `code` and [text](url) — the only inline markup the guides use
const Inline = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**')) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
        if (part.startsWith('`')) return <code key={i} className="font-mono text-[0.9em] bg-paper-deep px-1.5 py-0.5 rounded">{part.slice(1, -1)}</code>;
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const cls = 'text-azure underline underline-offset-4 hover:text-azure-deep transition-colors';
          return link[2].startsWith('/') ? (
            <Link key={i} to={link[2]} className={cls}>{link[1]}</Link>
          ) : (
            <a key={i} href={link[2]} rel="noopener noreferrer" className={cls}>{link[1]}</a>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
};

const BlockView = ({ block }: { block: Block }) => {
  if ('p' in block) return <p className="mb-5"><Inline text={block.p} /></p>;
  if ('ul' in block || 'ol' in block) {
    const ordered = 'ol' in block;
    const items = ordered ? block.ol : block.ul;
    const List = ordered ? 'ol' : 'ul';
    return (
      <List className={`mb-6 pl-6 space-y-3 ${ordered ? 'list-decimal' : 'list-disc'} marker:text-azure`}>
        {items.map((item, i) => <li key={i} className="pl-1"><Inline text={item} /></li>)}
      </List>
    );
  }
  if ('code' in block) {
    return (
      <pre className="mb-6 overflow-x-auto rounded-md bg-ink text-paper p-4 font-mono text-sm">
        <code>{block.code}</code>
      </pre>
    );
  }
  return (
    <div className="mb-6 border-t border-ink/15">
      {block.examples.map((ex, i) => (
        <div key={i} className="py-5 border-b border-ink/15">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink/50 mb-3">{ex.context}</p>
          <p className="mb-1.5 text-ink/60"><span className="font-mono text-xs mr-2 text-ink/40">Weak</span><s className="decoration-ink/30">{ex.bad}</s></p>
          <p><span className="font-mono text-xs mr-2 text-azure">Better</span>{ex.good}</p>
        </div>
      ))}
    </div>
  );
};

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

const GuideCard = ({ guide, level = 2 }: { guide: Guide; level?: 2 | 3 }) => {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
  <li className="border-b border-ink/15">
    <Link to={`/en/guides/${guide.slug}`} className="group block py-6">
      <Heading className="font-display text-2xl font-medium tracking-tight group-hover:text-azure transition-colors">{guide.title}</Heading>
      <p className="text-ink/70 mt-2 leading-relaxed">{guide.description}</p>
    </Link>
  </li>
  );
};

export const GuidesIndex = () => {
  usePageTitle('Alt text guides – AltVision');
  return (
    <div className="container mx-auto px-6">
      <main className="max-w-3xl mx-auto pt-16 md:pt-24" lang="en">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-azure block mb-3">Guides</span>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-6">Alt text guides</h1>
        <p className="text-lg text-ink/75 leading-relaxed mb-10">
          Practical guides to writing, checking and generating alt text — for WordPress sites, WCAG compliance and everyday web work.
        </p>
        <ul className="border-t border-ink/15">
          {GUIDES.map((g) => <GuideCard key={g.slug} guide={g} />)}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export const GuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = GUIDES.find((g) => g.slug === slug);
  usePageTitle(guide ? `${guide.title} – AltVision` : 'Guide not found – AltVision');

  if (!guide) {
    return (
      <div className="container mx-auto px-6">
        <main className="max-w-3xl mx-auto pt-16 md:pt-24" lang="en">
          <h1 className="font-display text-4xl font-medium tracking-tight mb-6">Guide not found</h1>
          <Link to="/en/guides" className="text-azure underline underline-offset-4">See all guides</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const others = GUIDES.filter((g) => g.slug !== guide.slug);

  return (
    <div className="container mx-auto px-6">
      <article className="max-w-3xl mx-auto pt-12 md:pt-20 text-[17px] leading-relaxed text-ink/85" lang="en">
        <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.15em] text-ink/50 mb-8">
          <Link to="/en/" className="hover:text-azure transition-colors">AltVision</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <Link to="/en/guides" className="hover:text-azure transition-colors">Guides</Link>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-ink mb-4">{guide.title}</h1>
        <p className="font-mono text-xs text-ink/50 mb-10">
          Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
        </p>

        <p className="font-display text-xl md:text-2xl leading-relaxed text-ink mb-12 border-l-2 border-azure pl-5">
          <Inline text={guide.summary} />
        </p>

        {guide.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-ink mb-5">{section.heading}</h2>
            {section.blocks.map((block, i) => <BlockView key={i} block={block} />)}
          </section>
        ))}

        {guide.faq.length > 0 && (
          <section className="mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-ink mb-5">Questions</h2>
            {guide.faq.map((item) => (
              <div key={item.q} className="py-5 border-t border-ink/15">
                <h3 className="font-display text-lg font-medium text-ink mb-2">{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </section>
        )}

        <aside className="mt-14 pt-8 border-t border-ink">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-azure mb-2">More guides</h2>
          <ul>{others.map((g) => <GuideCard key={g.slug} guide={g} level={3} />)}</ul>
        </aside>
      </article>
      <Footer />
    </div>
  );
};
