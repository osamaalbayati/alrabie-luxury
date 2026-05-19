"use client";

import type { CategoryId, MenuCategory } from "../data/menuData";

type CategoryTabsProps = {
  categories: MenuCategory[];
  activeCategory: CategoryId;
  onSelect: (categoryId: CategoryId) => void;
};

export default function CategoryTabs({
  categories,
  activeCategory,
  onSelect
}: CategoryTabsProps) {
  return (
    <div className="sticky top-20 z-30 -mx-4 border-y border-white/10 bg-luxury-black/78 px-4 py-3 backdrop-blur-2xl sm:top-24 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="hide-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={`min-h-12 shrink-0 rounded-2xl border px-5 py-3 text-sm font-black transition sm:text-base ${
                isActive
                  ? "border-luxury-mint bg-luxury-mint text-luxury-black shadow-green-glow"
                  : "border-white/10 bg-white/[0.04] text-white/70 hover:border-luxury-mint/60 hover:text-white"
              }`}
            >
              <span className="block">{category.title}</span>
              <span className={`block text-[0.65rem] uppercase tracking-[0.24em] ${isActive ? "text-black/55" : "text-white/35"}`}>
                {category.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
