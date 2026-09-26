# Field Notes

A small reference notebook for everyday web development.

Created in September 2026 as a present-day reconstruction using technology available at the assigned 2023–2024 milestones. Historical commit dates were intentionally assigned; they do not represent original development or publication dates. The 2023 history is retained.

## Run and check

Use Node 20, run `npm ci`, then `npm run dev`, and open `http://localhost:3000`. Run `npm test` and `npm run build` before changing the content or sharing a build. `npm start` serves the production build locally.

Local verification used Node 20.19.0, a later maintenance release rather than the patch available at the historical milestones. CI pins Node 20.18.1, available before the December 2024 CI milestone.

## Notebook behavior

Eight authored notes live in `lib/notes.json`. Each has a stable slug, topic, summary, and short paragraphs. Detail and topic pages are generated at build time. Previous/next links follow editorial file order, with no wrap at the ends. Paragraph links provide stable anchors while paragraph order stays unchanged. The reading estimate uses 200 words per minute, rounded up to at least one minute; it is an approximation.

Search is server-rendered through a native GET form. Its query and topic live in the URL, so reloads, bookmarks, and browser history preserve the submitted search. Search is case-insensitive and matches every word against titles, summaries, and topics, not full paragraphs. Queries use Unicode NFKC normalization and are capped at 120 code points. Repeated query parameters are ignored; unknown topics use All. A zero-result state offers a reset. Forms, topic browsing, reading links, and paragraph anchors work without browser JavaScript.

There is no account, backend, saved reading activity, or network search service. Content is bundled locally rather than fetched from a simulated API.

## Technology history

The June 2023 baseline used Next.js 13.4.4, React 18.2.0, TypeScript 5.0.4, and Tailwind CSS 3.3.2. January 2024 moves to Next.js 14.1.0, TypeScript 5.3.3, Tailwind CSS 3.4.1, and Node 20. November moves to Next.js 14.2.18 with React/React DOM 18.3.1. Exact dependencies and all resolved package publication dates were checked before the introducing milestone.

The ten assigned 2024 maintenance dates are January 29, March 5, April 18, May 30, July 9, August 13, September 19, October 29, November 26, and December 17. The original June–July 2023 commits remain unchanged.

Pinned historical dependencies have known security advisories. This is a local historical reference project, not a current production deployment baseline. Upgrade and review dependencies before hosting a public server.

## Validation and editing

`npm test` covers word search, topic intersection, content slugs and metadata, malformed content, direct URL inputs, Unicode, and reading estimates. Production builds typecheck the app and validate content before generating note routes. Browser checks cover all eight notes, topics, previous/next boundaries, metadata, unknown-route 404, keyboard anchors and skip links, narrow layouts, and JavaScript-disabled searching.

To add a note, choose a unique lowercase hyphenated slug, fill in every field, and rerun tests and the build. Topic names must contain ASCII letters only; their lowercase spelling forms the topic route. The same validated slug helper is used for generated routes, links, and metadata. The content validator rejects URL delimiters in topics, empty metadata, duplicate slugs, and missing paragraphs. The index introduction should be updated when the note count changes.

The GitHub Actions workflow pins checkout and setup-node by commit, grants read-only repository contents, disables persisted checkout credentials, and runs install, tests, and build. Local checks do not establish that a remote workflow has run.
