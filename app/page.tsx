import { readSearch, Params } from '@/lib/query';
import { notes } from '@/lib/notes';
import { NoteBrowser } from '@/components/note-browser';
export default function Home({ searchParams }: { searchParams: Params }) {
  const { q, tag } = readSearch(searchParams, notes.map((note) => note.tag));
  const index = notes.map(({ slug, title, tag, summary }) => ({
    slug,
    title,
    tag,
    summary,
  }));
  return (
    <main>
      <h1 className="text-4xl font-semibold tracking-tight">Field Notes</h1>
      <p className="mt-3 text-slate-600">
        Short references for everyday web work. Eight notes, kept deliberately brief.
      </p>
      <NoteBrowser notes={index} query={q} tag={tag} />
    </main>
  );
}
