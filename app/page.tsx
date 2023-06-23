import { notes } from '@/lib/notes';
import { NoteBrowser } from '@/components/note-browser';
export default function Home() {
  const index = notes.map(({ slug, title, tag, summary }) => ({ slug, title, tag, summary }));
  return <main><h1 className="text-4xl font-semibold tracking-tight">Field Notes</h1><p className="mt-3 text-slate-600">Short references for everyday web work. Six notes, kept deliberately brief.</p><NoteBrowser notes={index} /></main>;
}
