export type NoteIndex = { slug: string; title: string; tag: string; summary: string };
export function filterNotes(notes: NoteIndex[], query: string, tag: string = 'All') {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return notes.filter((note) => {
    const text = `${note.title} ${note.summary} ${note.tag}`.toLowerCase();
    return (tag === 'All' || note.tag === tag) && words.every((word) => text.includes(word));
  });
}
