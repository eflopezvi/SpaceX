"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen bg-black-950 text-white-50">
      <div className="mx-auto max-w-3xl p-8">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-white-300">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
