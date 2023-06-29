import Link from 'next/link';
export default function NotFound() {
  return <main><h1 className="text-3xl font-semibold">Note not found</h1><p className="mt-4">This address does not match a note in the collection.</p><Link className="mt-6 inline-block underline" href="/">Browse all notes</Link></main>;
}
