"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, MessageCircle } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Flame,
      title: "خبز ساخن طازج يومياً",
      description: "نخبز الخبز طازجاً كل يوم في فرننا الحديث لنقدمه لك ساخناً مباشرة من التنور.",
      color: "from-orange-500/20 to-red-500/10",
      borderColor: "border-orange-500/30",
      accentColor: "text-orange-400",
    },
    {
      icon: Sparkles,
      title: "مشاوي على الفحم",
      description: "جميع مشاويتنا تُطهى على فحم طبيعي حقيقي بتتبيلة عراقية خاصة وحب في الإعداد.",
      color: "from-amber-500/20 to-yellow-500/10",
      borderColor: "border-amber-500/30",
      accentColor: "text-amber-400",
    },
    {
      icon: MessageCircle,
      title: "طلب مباشر عبر واتساب",
      description: "تواصل معنا مباشرة على واتساب وقدم طلبك بسهولة واستقبله في الوقت المناسب لك.",
      color: "from-emerald-500/20 to-green-500/10",
      borderColor: "border-emerald-500/30",
      accentColor: "text-emerald-400",
    },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-luxury-mint/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-black text-white sm:text-4xl">
            لماذا تختار الربيع؟
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/55">
            نقدم لك أفضل خدمة وطعم شرقي أصيل مع التزام كامل بجودة المكونات والنظافة
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`group relative overflow-hidden rounded-3xl border ${feature.borderColor} bg-gradient-to-br ${feature.color} p-8 backdrop-blur-sm transition duration-500 hover:border-opacity-50`}
              >
                {/* Hover gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Floating icon background */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-30 transition duration-500 group-hover:opacity-50" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`mb-6 inline-flex rounded-2xl bg-white/10 p-4 ${feature.accentColor}`}
                  >
                    <Icon size={28} />
                  </motion.div>

                  <h3 className="mb-3 text-xl font-black text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/65">
                    {feature.description}
                  </p>

                  {/* Accent line */}
                  <div className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-current opacity-60`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
