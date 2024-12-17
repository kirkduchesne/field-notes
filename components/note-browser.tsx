import { topicSlug } from '@/lib/validate';
import Link from 'next/link';
import { filterNotes, NoteIndex } from '@/lib/search';

export function NoteBrowser({
  notes,
  query = '',
  tag = 'All',
}: {
  notes: NoteIndex[];
  query?: string;
  tag?: string;
}) {
  const tags = Array.from(new Set(notes.map((note) => note.tag))).sort();
  const visible = filterNotes(notes, query, tag);
  return (
    <div className="mt-8">
      <form action="/" method="get">
        <label htmlFor="search" className="block text-sm font-semibold">
          Search titles and summaries
        </label>
        <input
          id="search"
          type="search"
          name="q"
          defaultValue={query}
          maxLength={120}
          className="mt-2 w-full rounded border border-slate-400 bg-white px-3 py-2"
        />
        <label htmlFor="tag" className="mt-4 block text-sm font-semibold">
          Topic
        </label>
        <select
          id="tag"
          name="tag"
          defaultValue={tag}
          className="mt-2 rounded border border-slate-400 bg-white px-3 py-2"
        >
          <option>All</option>
          {tags.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
        <button
          type="submit"
          className="ml-3 rounded bg-slate-800 px-4 py-2 text-white"
        >
          Search
        </button>
      </form>
      <p role="status" className="mt-4 text-sm text-slate-600">
        {visible.length} {visible.length === 1 ? 'note' : 'notes'} found.
      </p>
      {visible.length === 0 ? (
        <div className="mt-5 rounded border border-stone-200 bg-white p-5">
          <p>No matching notes. Try fewer words or another topic.</p>
          <a href="/" className="mt-3 inline-block font-semibold underline">
            Clear filters
          </a>
        </div>
      ) : null}
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {visible.map((note) => (
          <li
            key={note.slug}
            className="min-w-0 rounded-lg border border-stone-200 bg-white p-5"
          >
            <p className="text-sm text-amber-800">
              <a
                href={`/topics/${topicSlug(note.tag)}`}
                className="underline"
              >
                {note.tag}
              </a>
            </p>
            <h2 className="mt-1 text-xl font-semibold">
              <Link
                href={`/notes/${note.slug}`}
                className="underline decoration-stone-300 underline-offset-4"
              >
                {note.title}
              </Link>
            </h2>
            <p className="mt-2">{note.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
