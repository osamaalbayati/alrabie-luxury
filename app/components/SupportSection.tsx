"use client";

import { motion } from "framer-motion";
import { Headphones, MessageCircle, Sparkles } from "lucide-react";
import { restaurantInfo } from "../data/menuData";

const supportMessage =
  "Hello Al Rabee Restaurant, I need support regarding my order.";

export default function SupportSection() {
  const supportHref = `${restaurantInfo.whatsappBaseUrl}/${restaurantInfo.whatsappPhone}?text=${encodeURIComponent(
    supportMessage
  )}`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="relative px-4 pb-16 pt-14 sm:px-6 lg:px-8"
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-soft-lift backdrop-blur-xl sm:p-10">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-luxury-mint/15 to-transparent blur-3xl" />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_0.6fr]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-luxury-mint/30 bg-black/40 px-4 py-2 text-sm font-black text-luxury-mint shadow-green-glow">
              <Headphones size={18} />
              دعم العملاء
            </div>
            <h2 className="text-4xl font-black text-white sm:text-5xl">
              استلام الدعم وعلى مدار الساعة.
            </h2>
            <p className="max-w-2xl leading-8 text-white/65">
              إذا كنت تحتاج مساعدة في الطلب، تخصيص الوجبة، أو متابعة التسليم، فريق الربيع مستعد لخدمتك عبر واتساب فوراً.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-white/40">الاستجابات</p>
                <p className="mt-3 text-2xl font-black text-white">سريع وفوري</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-white/40">الطلب الآمن</p>
                <p className="mt-3 text-2xl font-black text-white">خدمة خاصة للزبائن</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="mb-5 inline-flex items-center gap-3 text-white/80">
              <div className="grid h-12 w-12 place-items-center rounded-3xl bg-luxury-mint text-luxury-black shadow-green-glow">
                <MessageCircle size={22} />
              </div>
              <div>
                <p className="text-sm font-bold uppercase text-white/50">واتساب الدعم</p>
                <p className="mt-1 text-base font-black text-white">اتصل الآن</p>
              </div>
            </div>
            <p className="mb-6 text-sm leading-7 text-white/65">
              فريق الدعم متاح للطلبات، الاستفسارات، التعديلات الخاصة، ومتابعة التسليم بدقة.
            </p>
            <a
              href={supportHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-3xl bg-luxury-mint px-5 py-4 text-base font-black text-luxury-black transition hover:scale-[1.01] hover:bg-emerald-400"
            >
              <span>أرسل رسالة دعم</span>
              <Sparkles size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
