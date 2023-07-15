'use client';
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main>
      <h1 className="text-3xl font-semibold">The notes could not be displayed</h1>
      <p className="mt-4">Try loading this page again.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded bg-slate-800 px-4 py-2 text-white"
      >
        Try again
      </button>
    </main>
  );
}
