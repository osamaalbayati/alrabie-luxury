"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
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
      className="relative px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Support Card */}
          <div className="rounded-[2rem] border border-luxury-mint/20 bg-gradient-to-br from-luxury-mint/10 to-transparent p-8 backdrop-blur-xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-luxury-mint/40 bg-luxury-mint/20 px-4 py-2">
              <MessageCircle size={18} className="text-luxury-mint" />
              <span className="text-sm font-black text-luxury-mint">دعم فوري</span>
            </div>
            <h2 className="mb-4 text-3xl font-black text-white">
              استلام الدعم 24/7
            </h2>
            <p className="mb-6 leading-7 text-white/70">
              فريق الربيع مستعد لخدمتك في أي وقت عبر واتساب للطلبات والاستفسارات والتعديلات الخاصة.
            </p>
            <a
              href={supportHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-luxury-mint bg-luxury-mint/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-luxury-mint hover:text-luxury-black"
            >
              <MessageCircle size={16} />
              تواصل معنا الآن
            </a>
          </div>

          {/* Feedback Card */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2">
              <span className="text-lg">💬</span>
              <span className="text-sm font-black text-white/80">الملاحظات والشكاوي</span>
            </div>
            <h2 className="mb-4 text-3xl font-black text-white">
              رأيك مهم لنا
            </h2>
            <p className="mb-6 leading-7 text-white/70">
              نقدّر تعليقاتك وملاحظاتك. أخبرنا برأيك عن الخدمة والمنتجات لتحسين تجربتك.
            </p>
            <a
              href={`${restaurantInfo.whatsappBaseUrl}/${restaurantInfo.whatsappPhone}?text=لدي%20ملاحظة%20أو%20شكوى%20%F0%9F%92%AD`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3 text-sm font-bold text-white/80 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              <span>📝</span>
              أرسل ملاحظة
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
