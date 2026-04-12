'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CodeSnippetProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeSnippet({ code, language = 'html', filename, className }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  // Basic syntax highlighting via CSS classes - keep it simple
  const highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"([^"]+)"/g, '<span class="text-amber-300">"$1"</span>')
    .replace(/(&lt;\/?[\w-]+)/g, '<span class="text-blue-400">$1</span>')
    .replace(/(\/&gt;|&gt;)/g, '<span class="text-blue-400">$1</span>')
    .replace(/(src|data-bot-key|strategy|type|className)=/g, '<span class="text-cyan-300">$1</span>=');

  return (
    <div className={cn('terminal-bg overflow-hidden rounded-xl', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          {filename && (
            <span className="ml-2 text-xs text-white/30">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-[11px] text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      {/* Code */}
      <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-white/75">
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}
