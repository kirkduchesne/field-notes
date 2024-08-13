const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = fs.readFileSync('lib/search.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const context = { exports: {} };
vm.runInNewContext(compiled, context);
const { filterNotes } = context.exports;
const notes = require('../lib/notes.json');
test('all notes appear for blank or whitespace queries', () => {
  assert.equal(filterNotes(notes, '').length, notes.length);
  assert.equal(filterNotes(notes, '   ').length, notes.length);
});
test('search matches all words without case sensitivity', () => {
  assert.equal(filterNotes(notes, 'INPUT LABEL').length, 1);
  assert.equal(filterNotes(notes, 'input missingword').length, 0);
});
test('topic and search intersect without mutating the collection', () => {
  const before = JSON.stringify(notes);
  assert.equal(filterNotes(notes, '', 'React').length, 3);
  assert.equal(filterNotes(notes, 'label', 'React').length, 0);
  assert.equal(JSON.stringify(notes), before);
});
test('each authored note has a unique routable slug and useful content', () => {
  assert.equal(new Set(notes.map((note) => note.slug)).size, notes.length);
  for (const note of notes) {
    assert.match(note.slug, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(note.title && note.summary && note.tag);
    assert.ok(note.paragraphs.length >= 3);
  }
});
test('search treats markup as ordinary unmatched text', () => {
  assert.equal(filterNotes(notes, '<script>').length, 0);
});
