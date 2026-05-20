"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import type { MenuItem } from "../data/menuData";
import { formatIQD } from "../data/menuData";

type ProductCardProps = {
  product: MenuItem;
  onAdd: (product: MenuItem, optionId?: string) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const validOptions = Array.isArray(product.options) ? product.options : [];
  const [selectedOptionId, setSelectedOptionId] = useState(
    validOptions[0]?.id ?? ""
  );

  const selectedOption = validOptions.find(
    (option) => option.id === selectedOptionId
  );

  const productPrice = selectedOption?.price ?? product.price ?? 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-soft-lift backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-luxury-mint/50 hover:bg-white/[0.08]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-luxury-mint/70 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="flex min-h-[18rem] flex-col">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-black leading-8 text-white">{product.name ?? "منتج"}</h3>
              {product.badge ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-luxury-mint/35 bg-luxury-mint/12 px-2.5 py-1 text-xs font-extrabold text-luxury-mint">
                  <Sparkles size={12} />
                  {product.badge}
                </span>
              ) : null}
            </div>
            {product.notes ? (
              <p className="mt-1 text-xs font-bold text-luxury-mint/85">{product.notes}</p>
            ) : null}
          </div>

          <div className="shrink-0 rounded-2xl bg-black/35 px-3 py-2 text-right text-sm font-black text-white green-ring">
            <p className="text-xs text-white/55">السعر</p>
            <p>{formatIQD(productPrice)}</p>
          </div>
        </div>

        <p className="mb-5 flex-1 text-sm leading-7 text-white/62">
          {product.description ?? "وصف المنتج غير متوفر حالياً"}
        </p>

        {validOptions.length > 0 ? (
          <div className="mb-5">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-white/50">
              اختر
            </p>
            <div className="flex flex-wrap gap-2">
              {validOptions.map((option) => {
                const isActive = option.id === selectedOptionId;
                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedOptionId(option.id)}
                    className={`rounded-3xl border px-4 py-3 text-left text-sm font-bold transition duration-200 ${
                      isActive
                        ? "border-luxury-mint bg-luxury-mint text-luxury-black shadow-green-glow"
                        : "border-white/10 bg-black/25 text-white/75 hover:border-luxury-mint/70 hover:text-white"
                    }`}
                  >
                    <span>{option.label}</span>
                    <span className="mt-1 block text-xs font-semibold text-white/45">
                      {formatIQD(option.price)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => onAdd(product, selectedOptionId || undefined)}
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-3xl bg-luxury-mint px-5 py-3 text-sm font-black text-luxury-black transition duration-300 hover:scale-[1.01] hover:shadow-green-glow active:scale-[0.98]"
        >
          <Plus size={18} />
          أضف للسلة
        </button>
      </div>
    </motion.article>
  );
}
