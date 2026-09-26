import { topicSlug } from '@/lib/validate';
import { notes } from '@/lib/notes';
import { notFound } from 'next/navigation';

export const dynamicParams = false;
export function generateStaticParams() {
  return Array.from(new Set(notes.map((note) => topicSlug(note.tag)))).map(
    (topic) => ({ topic })
  );
}
export function generateMetadata({ params }: { params: { topic: string } }) {
  const note = notes.find((item) => topicSlug(item.tag) === params.topic);
  return { title: note ? `${note.tag} notes` : 'Topic not found' };
}
export default function TopicPage({ params }: { params: { topic: string } }) {
  const matches = notes.filter(
    (note) => topicSlug(note.tag) === params.topic
  );
  if (!matches.length) notFound();
  return (
    <main>
      <a href="/" className="underline">
        All notes
      </a>
      <h1 className="mt-6 text-3xl font-semibold">{matches[0].tag} notes</h1>
      <ul className="mt-6 space-y-5">
        {matches.map((note) => (
          <li key={note.slug}>
            <h2 className="text-xl font-semibold">
              <a className="underline" href={`/notes/${note.slug}`}>
                {note.title}
              </a>
            </h2>
            <p className="mt-2">{note.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
