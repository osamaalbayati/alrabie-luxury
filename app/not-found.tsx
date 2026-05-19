import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-soft-lift">
        <div className="rounded-full border border-luxury-mint/30 bg-luxury-mint/10 p-6 text-luxury-mint shadow-[0_0_40px_rgba(34,197,94,0.18)]">
          <span className="text-4xl font-black">404</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black text-white sm:text-5xl">الصفحة غير موجودة</h1>
          <p className="max-w-2xl text-sm leading-7 text-white/65">
            يبدو أن هذه الصفحة غير متوفرة حالياً. رجوعك للموقع الرئيسي يضمن استمرار تجربة الطلب بكل سهولة.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-3xl bg-luxury-mint px-6 py-4 text-sm font-black text-luxury-black transition hover:scale-[1.01]"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </main>
  );
}
