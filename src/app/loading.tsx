export default function Loading() {
  return (
    <main className="min-h-screen bg-black-950 text-white-50">
      <div className="mx-auto max-w-6xl p-8">
        <div className="h-7 w-64 rounded bg-white/10" />
        <div className="mt-6 grid gap-4 md:grid-cols-[360px_1fr]">
          <div className="h-[70vh] rounded-2xl border border-white/10 bg-white/5" />
          <div className="h-[70vh] rounded-2xl border border-white/10 bg-white/5" />
        </div>
      </div>
    </main>
  );
}
