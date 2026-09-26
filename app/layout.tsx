import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: { default: 'Field Notes', template: '%s | Field Notes' },
  description: 'Short practical references for everyday web development.',
};
import Link from 'next/link';
import { ReactNode } from 'react';
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-slate-800 antialiased">
        <div className="mx-auto max-w-4xl px-5 py-10">
          <a href="#content" className="sr-only focus:not-sr-only">
            Skip to content
          </a>
          <nav
            aria-label="Main"
            className="mb-8 border-b border-stone-300 pb-4"
          >
            <Link href="/" className="font-semibold tracking-wide">
              Field Notes / Web reference
            </Link>
          </nav>
          <div id="content" tabIndex={-1}>
            {children}
          </div>
          <footer className="mt-12 border-t border-stone-300 pt-4 text-sm text-slate-500">
            A small collection of practical reminders.
          </footer>
        </div>
      </body>
    </html>
  );
}
