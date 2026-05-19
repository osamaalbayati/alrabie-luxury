"use client";

import { ShoppingBag, Utensils } from "lucide-react";
import type { CategoryId, MenuCategory } from "../data/menuData";

type HeaderProps = {
  categories: MenuCategory[];
  activeCategory: CategoryId;
  cartCount: number;
  onCartClick: () => void;
  onCategorySelect: (categoryId: CategoryId) => void;
};

export default function Header({
  categories,
  activeCategory,
  cartCount,
  onCartClick,
  onCategorySelect
}: HeaderProps) {
  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
      <div className="glass-panel mx-auto flex max-w-7xl items-center gap-2 rounded-2xl px-3 py-2 sm:gap-4 sm:px-5">
        <button
          type="button"
          onClick={scrollToHero}
          className="group flex shrink-0 items-center gap-2 rounded-xl px-2 py-2 text-right transition hover:bg-white/10"
          aria-label="مطعم الربيع"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-luxury-mint text-luxury-black shadow-green-glow transition group-hover:scale-105">
            <Utensils size={20} strokeWidth={2.4} />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-lg font-black text-white">الربيع</span>
            <span className="block text-[0.68rem] font-semibold text-white/55">مطعم عربي فاخر</span>
          </span>
        </button>

        <nav className="hide-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1 text-sm font-bold text-white/70">
          <button
            type="button"
            onClick={scrollToMenu}
            className="shrink-0 rounded-full border border-white/10 px-4 py-2 transition hover:border-luxury-mint/60 hover:text-white"
          >
            المنيو
          </button>
          {categories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategorySelect(category.id)}
                className={`shrink-0 rounded-full border px-4 py-2 transition ${
                  isActive
                    ? "border-luxury-mint bg-luxury-mint text-luxury-black shadow-green-glow"
                    : "border-white/10 hover:border-luxury-mint/60 hover:text-white"
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onCartClick}
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-luxury-mint/40 bg-luxury-green/20 text-white shadow-green-glow transition hover:scale-105 hover:bg-luxury-mint hover:text-luxury-black"
          aria-label="فتح السلة"
        >
          <ShoppingBag size={20} />
          {cartCount > 0 ? (
            <span className="absolute -left-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-white px-1 text-xs font-black text-luxury-black">
              {cartCount}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  );
}
