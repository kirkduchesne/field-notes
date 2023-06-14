import { notes } from '@/lib/notes';
export default function Home() {
  return <main><h1 className="text-4xl font-semibold tracking-tight">Field Notes</h1><p className="mt-3 text-slate-600">Short references for everyday web work.</p><ul className="mt-8 space-y-4">{notes.map((note) => <li key={note.slug} className="rounded-lg border border-stone-200 bg-white p-5"><h2 className="text-xl font-semibold">{note.title}</h2><p className="mt-2">{note.summary}</p></li>)}</ul></main>;
}
