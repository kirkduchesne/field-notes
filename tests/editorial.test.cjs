const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(name) {
  const code = ts.transpileModule(fs.readFileSync(`lib/${name}.ts`, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const context = { exports: {} };
  vm.runInNewContext(code, context);
  return context.exports;
}
const { readSearch } = load('query');
const { readingMinutes } = load('reading');
const { validateNotes, topicSlug } = load('validate');
const notes = require('../lib/notes.json');
test('URL filters normalize unicode and reject repeated or unknown values', () => {
  assert.equal(readSearch({ q: ' Ｒｅａｃｔ ', tag: 'React' }, ['React']).q, 'React');
  assert.equal(readSearch({ q: ['a', 'b'], tag: ['React', 'CSS'] }, ['React']).tag, 'All');
  assert.equal(readSearch({ tag: 'Unknown' }, ['React']).tag, 'All');
  assert.equal(Array.from(readSearch({ q: '😀'.repeat(121) }, []).q).length, 120);
});
test('reading estimate uses a minimum minute and rounds up', () => {
  assert.equal(readingMinutes([]), 1);
  assert.equal(readingMinutes(['word '.repeat(200)]), 1);
  assert.equal(readingMinutes(['word '.repeat(201)]), 2);
});
test('content validation rejects missing metadata, duplicates and bad paragraphs', () => {
  assert.doesNotThrow(() => validateNotes(notes));
  for (const value of [[], {}, [notes[0], notes[0]], [{ ...notes[0], title: ' ' }], [{ ...notes[0], paragraphs: [''] }]]) assert.throws(() => validateNotes(value));
});

test('topic route names reject URL delimiters before content is rendered', () => {
  assert.equal(topicSlug('JavaScript'), 'javascript');
  for (const tag of ['HTML/CSS', 'HTML?CSS', 'HTML#CSS', 'HTML%2FCSS', 'HTML CSS', '../CSS', 'CSS\n']) {
    assert.throws(() => topicSlug(tag));
    assert.throws(() => validateNotes([{ ...notes[0], tag }]));
  }
  for (const note of notes) assert.match(topicSlug(note.tag), /^[a-z]+$/);
});
