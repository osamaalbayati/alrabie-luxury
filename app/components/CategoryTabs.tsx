"use client";

import type { CategoryId, MenuCategory } from "../data/menuData";

type CategoryTabsProps = {
  categories: readonly MenuCategory[];
  activeCategory: CategoryId;
  onSelect: (categoryId: CategoryId) => void;
};

export default function CategoryTabs({
  categories,
  activeCategory,
  onSelect,
}: CategoryTabsProps) {
  const validCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
          {validCategories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelect(category.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? "border-luxury-mint bg-luxury-mint text-luxury-black shadow-green-glow"
                    : "border-white/10 bg-white/[0.04] text-white/70 hover:border-luxury-mint/60 hover:text-white"
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}