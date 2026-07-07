'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export type LegalDocId = 'terms' | 'privacy' | 'cookies' | 'dpa' | 'subprocessors' | 'refund' | 'cancellation';

type Section = { id: string; label: string };

type Doc = {
  id: LegalDocId;
  label: string;
  href: string;
};

const DOCS: Doc[] = [
  { id: 'terms', label: 'Terms of Service', href: '/legal/terms' },
  { id: 'privacy', label: 'Privacy Policy', href: '/legal/privacy' },
  { id: 'cookies', label: 'Cookie Policy', href: '/legal/cookies' },
  { id: 'dpa', label: 'Data Processing Addendum', href: '/legal/dpa' },
  { id: 'subprocessors', label: 'Subprocessors List', href: '/legal/subprocessors' },
  { id: 'refund', label: 'Refund Policy', href: '/legal/refund' },
  { id: 'cancellation', label: 'Cancellation Policy', href: '/legal/cancellation' },
];

type Props = {
  currentDoc: LegalDocId;
  sections: Section[];
};

export default function LegalSidebar({ currentDoc, sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    if (sections.length === 0) return;

    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-96px 0px -70% 0px',
        threshold: [0, 1],
      },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
    setActiveId(id);
  };

  return (
    <nav aria-label="Legal documents" className="text-sm">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 mb-5">Legal</p>
      <ul className="space-y-1">
        {DOCS.map((doc) => {
          const isCurrent = doc.id === currentDoc;
          return (
            <li key={doc.id}>
              {isCurrent ? (
                <>
                  <span className="block py-1.5 font-medium text-white">{doc.label}</span>
                  {sections.length > 0 && (
                    <ul className="mt-1 mb-3 ml-1 border-l border-white/10 space-y-2 pt-1.5 pl-4">
                      {sections.map((s) => {
                        const isActive = activeId === s.id;
                        return (
                          <li key={s.id}>
                            <a
                              href={`#${s.id}`}
                              onClick={(e) => handleSectionClick(e, s.id)}
                              className={`block leading-snug transition-colors ${
                                isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                              }`}
                            >
                              {s.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={doc.href}
                  className="block py-1.5 text-white/55 hover:text-white transition-colors"
                >
                  {doc.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
