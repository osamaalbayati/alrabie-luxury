export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-luxury-black px-6 text-white">
      <div className="glass-panel green-ring flex w-full max-w-sm flex-col items-center gap-5 rounded-[2rem] p-8 text-center">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/15 bg-white/10">
          <span className="absolute inset-x-3 top-1/2 h-px bg-luxury-mint shadow-green-glow" />
          <span className="absolute inset-0 animate-shimmer bg-gradient-to-l from-transparent via-white/30 to-transparent" />
        </div>
        <div>
          <p className="text-2xl font-black">الربيع</p>
          <p className="mt-1 text-sm text-white/60">يتم تجهيز التجربة</p>
        </div>
      </div>
    </main>
  );
}
