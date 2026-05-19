import { Clock, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { categories, restaurantInfo } from "../data/menuData";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/35 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-luxury-mint text-luxury-black shadow-green-glow">
              <Sparkles size={22} />
            </span>
            <div>
              <p className="text-3xl font-black text-white">{restaurantInfo.name}</p>
              <p className="text-sm font-bold text-white/50">{restaurantInfo.tagline}</p>
            </div>
          </div>
          <p className="max-w-xl leading-8 text-white/58">
            منيو : أطباق صباحية، مناقيش ساخنة، مشاوي على الفحم، وكنافة طازجة بلمسة الربيع.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-black text-white">الأقسام</h2>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#category-${category.id}`}
                className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-bold text-white/66 transition hover:border-luxury-mint hover:text-white"
              >
                {category.title}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-black text-white">الطلب والتوصيل</h2>
          <div className="space-y-3 text-sm font-semibold text-white/62">
            <p className="flex items-center gap-3">
              <Clock size={18} className="text-luxury-mint" />
              يومياً لمدة 24 ساعة
            </p>
            <p className="flex items-center gap-3">
              <MessageCircle size={18} className="text-luxury-mint" />
              الطلب يجهز تلقائياً عبر واتساب
            </p>
            <p className="flex items-center gap-3">
              <MapPin size={18} className="text-luxury-mint" />
              خدمة توصيل داخل النجف
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm font-semibold text-white/38 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 مطعم الربيع. جميع الحقوق محفوظة.</p>
        <a href="#hero" className="text-luxury-mint transition hover:text-white">
          العودة للأعلى
        </a>
      </div>
      <div className="mx-auto mt-8 max-w-7xl overflow-hidden rounded-2xl border border-white/10">
        <Image
          src="/images/al-rabee/end.jpg"
          alt="معلومات التواصل وفروع الربيع"
          width={1200}
          height={1200}
          className="h-auto w-full object-cover"
        />
      </div>
    </footer>
  );
}
