import data from './notes.json';
export type Note = { slug: string; title: string; tag: string; summary: string; paragraphs: string[] };
export const notes: Note[] = data;
export function getNote(slug: string) { return notes.find((note) => note.slug === slug); }
