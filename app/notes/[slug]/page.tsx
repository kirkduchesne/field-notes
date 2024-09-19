import { readingMinutes } from '@/lib/reading';
import type { Metadata } from 'next';
import { getNote, notes } from '@/lib/notes';
import { notFound } from 'next/navigation';
export const dynamicParams = false;
export function generateStaticParams() {
  return notes.map(({ slug }) => ({ slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const note = getNote(params.slug);
  return note ? { title: note.title, description: note.summary } : { title: 'Note not found' };
}
export default function NotePage({ params }: { params: { slug: string } }) {
  const note = getNote(params.slug);
  if (!note) notFound();
  const position = notes.findIndex((item) => item.slug === note.slug);
  const previous = notes[position - 1];
  const next = notes[position + 1];
  return (
    <main>
      <p className="text-sm font-medium text-amber-800"><a href={`/topics/${note.tag.toLowerCase()}`} className="underline">{note.tag}</a></p>
      <h1 className="mt-2 text-3xl font-semibold">{note.title}</h1>
      <p className="mt-3 text-sm text-slate-500">About {readingMinutes(note.paragraphs)} minute read</p>
      <p className="mt-4 text-lg text-slate-600">{note.summary}</p>
      <div className="mt-8 max-w-2xl space-y-5 leading-7">
        {note.paragraphs.map((paragraph, index) => (
          <p key={paragraph} id={`paragraph-${index + 1}`} tabIndex={-1} className="scroll-mt-6">
            {paragraph} <a href={`#paragraph-${index + 1}`} aria-label={`Link to paragraph ${index + 1}`} className="text-amber-800 underline">¶</a>
          </p>
        ))}
      </div>
      <nav aria-label="Reading order" className="mt-10 grid gap-4 border-t border-stone-300 pt-5 sm:grid-cols-2">
        {previous ? <a href={`/notes/${previous.slug}`} rel="prev" className="underline">Previous: {previous.title}</a> : <span />}
        {next ? <a href={`/notes/${next.slug}`} rel="next" className="underline">Next: {next.title}</a> : null}
      </nav>
    </main>
  );
}
