"use client";

import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import type { MenuItem } from "../data/menuData";
import { formatIQD } from "../data/menuData";

type ProductCardProps = {
  product: MenuItem;
  onAdd: (product: MenuItem, optionId?: string) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const [selectedOptionId, setSelectedOptionId] = useState(
    product.options?.[0]?.id ?? ""
  );

  const selectedOption = product.options?.find(
    (option) => option.id === selectedOptionId
  );

  const productPrice = selectedOption?.price ?? product.price;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-4 shadow-soft-lift backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-luxury-mint/50 hover:bg-white/[0.08] sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-luxury-mint/70 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex min-h-44 flex-col">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-black leading-8 text-white">{product.name}</h3>
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
          <p className="shrink-0 rounded-2xl bg-black/35 px-3 py-2 text-sm font-black text-white green-ring">
            {formatIQD(productPrice)}
          </p>
        </div>

        <p className="mb-5 flex-1 text-sm leading-7 text-white/62">{product.description}</p>

        {product.options ? (
          <label className="mb-4 grid gap-2 text-sm font-bold text-white/65">
            <span>اختر الوزن</span>
            <select
              value={selectedOptionId}
              onChange={(event) => setSelectedOptionId(event.target.value)}
              className="h-14 w-full rounded-3xl border border-white/10 bg-black/30 px-4 text-white outline-none transition focus:border-green-400 focus:bg-black/40"
            >
              {product.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label} — {formatIQD(option.price)}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <button
          type="button"
          onClick={() => onAdd(product, selectedOptionId || undefined)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-luxury-black transition hover:bg-luxury-mint hover:shadow-green-glow active:scale-[0.98]"
        >
          <Plus size={18} strokeWidth={2.5} />
          أضف للسلة
        </button>
      </div>
    </article>
  );
}
