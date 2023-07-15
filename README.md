# Field Notes

A small reference notebook for everyday web development.

Created in September 2026 as a present-day reconstruction using technology available by June 8, 2023. Historical commit dates were intentionally assigned to June 8, 11, 14, 17, 20, 23, 26, 29 and July 3, 7, 11, 15, 2023. These dates do not represent original development or publication dates.

Run `npm ci`, `npm run dev`, then open localhost:3000. Node 18 is the intended runtime series.

## Stack and historical baseline

Next.js 13.4.4 (App Router), React 18.2.0, TypeScript 5.0.4, and Tailwind CSS 3.3.2. Exact package versions and the lockfile were resolved with a June 8, 2023 cutoff. Next.js 13.4.4 was published May 25, 2023. Node 18.20.5 was used for verification; it is a later maintenance release of the intended Node 18 series, not a release available in June 2023.

The pinned historical dependencies have known security advisories. This is a local historical reference project, not a current production deployment baseline. Upgrade and review dependencies before hosting a public server.

## How it works

Six authored notes live in `lib/notes.json`. Each has a stable slug, topic, summary, and short paragraphs. Next generates the detail routes at build time. The server passes only titles, summaries, topics, and slugs to the client search component; the full paragraphs remain in detail pages.

Search is case-insensitive and matches every entered word against title, summary, and topic. Topic selection combines with the query. A zero-result state offers a reset. Search state is temporary and resets when the index remounts. There is no account, backend, or network search service.

## Validation

- `npm test`: search normalization, topic intersection, content routes, and ordinary-text handling.
- `npm run build`: TypeScript checks and production rendering for the index and six notes.
- Browser checks: combined filters, reset, empty search, all note routes and metadata, unknown-route 404, and narrow-screen layout.

To add a note, choose a unique lowercase hyphenated slug, fill in the same fields, and rerun tests and the build. Search indexes summaries rather than full article text.
