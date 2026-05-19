"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, MessageCircle, ShoppingBag } from "lucide-react";
import { restaurantInfo } from "../data/menuData";

type HeroProps = {
  onExplore: () => void;
  onOrder: () => void;
};

const heroImage = "/images/al-rabee/main.jpg";

export default function Hero({ onExplore, onOrder }: HeroProps) {
  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className="relative flex min-h-[100svh] items-end overflow-hidden px-4 pb-10 pt-28 sm:px-6 lg:px-8"
    >
      <Image
        src={heroImage}
        alt="مطعم الربيع"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/72 to-luxury-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(34,197,94,0.25),transparent_34rem)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start gap-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-luxury-mint/30 bg-white/10 px-4 py-2 text-sm font-bold text-luxury-mint backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-luxury-mint shadow-green-glow" />
            طازج يومياً
          </div>
          <h1 className="text-balance text-6xl font-black leading-[0.95] tracking-normal text-white sm:text-8xl lg:text-9xl">
            {restaurantInfo.name.replace("مطعم ", "")}
          </h1>
          <p className="max-w-2xl text-xl font-bold text-white/86 sm:text-3xl">
            {restaurantInfo.tagline}
          </p>
          <p className="max-w-xl text-base leading-8 text-white/62 sm:text-lg">
            منيو الربيع الأصلي: فطور صباحي، مناقيش فرن، بيتزا، مشاوي على الفحم، وكنافة طازجة.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <button
            type="button"
            onClick={onExplore}
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-base font-black text-luxury-black transition hover:-translate-y-0.5 hover:bg-luxury-mint hover:shadow-green-glow"
          >
            <ArrowDown size={20} className="transition group-hover:translate-y-0.5" />
            تصفح المنيو
          </button>
          <button
            type="button"
            onClick={onOrder}
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-luxury-mint/50 bg-luxury-green/20 px-6 py-4 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-luxury-mint hover:text-luxury-black hover:shadow-green-glow"
          >
            <ShoppingBag size={20} />
            اطلب الآن
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="grid w-full gap-3 sm:grid-cols-3"
        >
          {["خبز ساخن", "مشاوي على الفحم", "طلب واتساب"].map((item, index) => (
            <div
              key={item}
              className="glass-panel rounded-2xl px-4 py-3 text-sm font-bold text-white/78"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-luxury-mint" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>

      <button
        type="button"
        onClick={onOrder}
        className="absolute bottom-7 left-5 z-10 hidden rounded-full border border-white/15 bg-white/10 p-4 text-white backdrop-blur transition hover:border-luxury-mint hover:text-luxury-mint sm:grid"
        aria-label="طلب عبر واتساب"
      >
        <MessageCircle size={22} />
      </button>
    </motion.section>
  );
}
