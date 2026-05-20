export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#050505] px-6 text-white">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-luxury-mint bg-luxury-green/10 shadow-[0_0_40px_rgba(34,197,94,0.18)]">
        <svg
          className="h-12 w-12 animate-spin text-luxury-mint"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" opacity="0.15" />
          <path d="M22 12a10 10 0 0 1-10 10" />
        </svg>
      </div>
    </main>
  );
}
