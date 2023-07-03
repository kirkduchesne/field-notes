import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: { default: 'Field Notes', template: '%s | Field Notes' }, description: 'Short practical references for everyday web development.' };
import { ReactNode } from 'react';
export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body className="bg-stone-50 text-slate-800 antialiased"><div className="mx-auto max-w-4xl px-5 py-10">{children}</div></body></html>;
}
