export function validateNotes(value: unknown): void {
  if (!Array.isArray(value) || value.length === 0) throw new Error('Notes must be a nonempty list.');
  const slugs = new Set<string>();
  for (const note of value) {
    if (!note || typeof note.slug !== 'string' || !/^[a-z]+(?:-[a-z]+)*$/.test(note.slug) || slugs.has(note.slug)) throw new Error('Each note needs a unique lowercase slug.');
    for (const key of ['title', 'summary', 'tag']) {
      if (typeof note[key] !== 'string' || !note[key].trim()) throw new Error('Note metadata must be nonempty text.');
    }
    if (!Array.isArray(note.paragraphs) || note.paragraphs.length === 0 || note.paragraphs.some((text: unknown) => typeof text !== 'string' || !text.trim())) throw new Error('Notes need readable paragraphs.');
    slugs.add(note.slug);
  }
}
