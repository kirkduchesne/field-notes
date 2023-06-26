"use client";

import Link from 'next/link';
import { useState } from 'react';
import { filterNotes, NoteIndex } from '@/lib/search';

export function NoteBrowser({ notes }: { notes: NoteIndex[] }) {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('All');
  const tags = Array.from(new Set(notes.map((note) => note.tag))).sort();
  const visible = filterNotes(notes, query, tag);
  return <div className="mt-8">
    <label htmlFor="search" className="block text-sm font-semibold">Search titles and summaries</label>
    <input id="search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="mt-2 w-full rounded border border-slate-400 bg-white px-3 py-2" />
    <label htmlFor="tag" className="mt-4 block text-sm font-semibold">Topic</label>
    <select id="tag" value={tag} onChange={(event) => setTag(event.target.value)} className="mt-2 rounded border border-slate-400 bg-white px-3 py-2"><option>All</option>{tags.map((value) => <option key={value}>{value}</option>)}</select>
    <ul className="mt-6 space-y-4">{visible.map((note) => <li key={note.slug} className="rounded-lg border border-stone-200 bg-white p-5"><p className="text-sm text-amber-800">{note.tag}</p><h2 className="mt-1 text-xl font-semibold"><Link href={`/notes/${note.slug}`} className="underline decoration-stone-300 underline-offset-4">{note.title}</Link></h2><p className="mt-2">{note.summary}</p></li>)}</ul>
  </div>;
}
