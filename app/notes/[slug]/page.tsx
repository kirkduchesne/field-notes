import type { Metadata } from 'next';
import { getNote, notes } from '@/lib/notes';
import { notFound } from 'next/navigation';
export function generateStaticParams() { return notes.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const note = getNote(params.slug);
  return note ? { title: note.title, description: note.summary } : { title: 'Note not found' };
}
export default function NotePage({ params }: { params: { slug: string } }) {
  const note = getNote(params.slug);
  if (!note) notFound();
  return <main><p className="text-sm font-medium text-amber-800">{note.tag}</p><h1 className="mt-2 text-3xl font-semibold">{note.title}</h1><p className="mt-4 text-lg text-slate-600">{note.summary}</p><div className="mt-8 max-w-2xl space-y-5 leading-7">{note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></main>;
}
