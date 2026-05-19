"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MessageCircle, Search, ShoppingBag, X } from "lucide-react";
import CartDrawer, { type CartLine } from "./components/CartDrawer";
import CategoryTabs from "./components/CategoryTabs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import SupportSection from "./components/SupportSection";
import {
  MENU_ITEMS_STORAGE_KEY,
  WHATSAPP_PHONE_STORAGE_KEY,
  type CategoryId,
  type MenuItem,
  buildMenuGroups,
  categories,
  getDefaultProducts,
  restaurantInfo,
} from "./data/menuData";

const normalizeSearch = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u064B-\u065F]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .trim();

export default function HomePage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(getDefaultProducts);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("breakfast");
  const [searchTerm, setSearchTerm] = useState("");
  const [whatsappPhone, setWhatsappPhone] = useState("9647804000463");

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(MENU_ITEMS_STORAGE_KEY);
      if (savedItems) {
        const parsed = JSON.parse(savedItems) as MenuItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMenuItems(parsed);
        }
      }

      const savedPhone = localStorage.getItem(WHATSAPP_PHONE_STORAGE_KEY);
      if (savedPhone?.trim()) {
        setWhatsappPhone(savedPhone.trim());
      } else {
        localStorage.setItem(
          WHATSAPP_PHONE_STORAGE_KEY,
          "9647804000463"
        );
      }
    } catch {
      // ignore invalid localStorage
    }
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const filteredGroups = useMemo(() => {
    const query = normalizeSearch(searchTerm);
    const groups = buildMenuGroups(menuItems);

    if (!query) {
      return groups;
    }

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const target = normalizeSearch(
            `${item.name} ${item.description} ${item.notes ?? ""}`
          );
          return target.includes(query);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [menuItems, searchTerm]);

  const resultCount = useMemo(
    () => filteredGroups.reduce((sum, group) => sum + group.items.length, 0),
    [filteredGroups]
  );

  const scrollToMenu = useCallback(() => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToCategory = useCallback((categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    document.getElementById(`category-${categoryId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const addToCart = (product: MenuItem, optionId?: string) => {
    setCart((current) => {
      const selectedOption = product.options?.find(
        (option) => option.id === optionId
      );
      const lineId = `${product.id}|${selectedOption?.id ?? "default"}`;

      const existing = current.find((item) => item.id === lineId);
      if (existing) {
        return current.map((item) =>
          item.id === lineId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        { id: lineId, product, selectedOption, quantity: 1 },
      ];
    });
  };

  const incrementItem = (lineId: string) => {
    setCart((current) =>
      current.map((item) =>
        item.id === lineId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementItem = (lineId: string) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === lineId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (lineId: string) => {
    setCart((current) => current.filter((item) => item.id !== lineId));
  };

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-menu-section]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const target = visible?.target as HTMLElement | undefined;
        const categoryId = target?.dataset.category as CategoryId | undefined;

        if (categoryId) {
          setActiveCategory(categoryId);
        }
      },
      {
        rootMargin: "-32% 0px -50% 0px",
        threshold: [0.18, 0.35, 0.55],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const hasSearch = searchTerm.trim().length > 0;
  const menuCategories = [...categories];

  return (
    <main className="min-h-screen overflow-hidden bg-luxury-black text-white">
      <Header
        categories={menuCategories}
        activeCategory={activeCategory}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onCategorySelect={scrollToCategory}
      />

      <Hero onExplore={scrollToMenu} onOrder={() => setIsCartOpen(true)} />

      <section id="menu" className="relative px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-radial-green opacity-80" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_26rem] lg:items-end">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-luxury-mint/30 bg-luxury-green/10 px-4 py-2 text-sm font-black text-luxury-mint">
                منيو الربيع
              </p>
              <h2 className="text-balance text-4xl font-black leading-tight text-white sm:text-6xl">
                اختر طبقك، والسلة تجهز الطلب لواتساب.
              </h2>
            </div>

            <div className="flex gap-3">
              <label className="relative block flex-1">
                <Search
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/42"
                  size={20}
                />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="ابحث عن طبق أو وصف"
                  className="h-14 w-full rounded-2xl border border-white/12 bg-white/[0.07] pr-12 pl-12 text-base font-bold text-white outline-none backdrop-blur-xl transition placeholder:text-white/35 focus:border-luxury-mint focus:shadow-green-glow"
                />
                {searchTerm ? (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl bg-white/10 text-white/65 transition hover:bg-white/15 hover:text-white"
                    aria-label="مسح البحث"
                  >
                    <X size={18} />
                  </button>
                ) : null}
              </label>
            </div>
          </div>
        </div>

        <CategoryTabs
          categories={menuCategories}
          activeCategory={activeCategory}
          onSelect={scrollToCategory}
        />

        <div className="mx-auto mt-10 max-w-7xl">
          {hasSearch ? (
            <p className="mb-6 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-bold text-white/62">
              نتائج البحث:{" "}
              <span className="text-luxury-mint">{resultCount}</span>
            </p>
          ) : null}

          {filteredGroups.length === 0 ? (
            <div className="glass-panel mx-auto grid max-w-lg place-items-center rounded-[2rem] px-6 py-16 text-center">
              <div className="mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-luxury-green/15 text-luxury-mint green-ring">
                <Search size={28} />
              </div>
              <h3 className="text-2xl font-black text-white">لا توجد نتائج</h3>
              <p className="mt-3 leading-7 text-white/58">
                لا يوجد طبق مطابق حالياً في منيو الربيع.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredGroups.map((group) => (
                <section
                  key={group.category.id}
                  id={`category-${group.category.id}`}
                  data-menu-section
                  data-category={group.category.id}
                  className="scroll-mt-36"
                >
                  <div className="relative mb-6 min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/10 shadow-soft-lift sm:min-h-[28rem]">
                    <Image
                      src={group.category.image}
                      alt={group.category.title}
                      fill
                      sizes="(min-width: 1024px) 1200px, 100vw"
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                      <p className="mb-3 text-xs font-black uppercase tracking-[0.32em] text-luxury-mint">
                        {group.category.subtitle}
                      </p>
                      <h3 className="text-4xl font-black text-white sm:text-6xl">
                        {group.category.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
                        {group.category.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={addToCart}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>

      <SupportSection />

      <Footer />

      <div className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between gap-3 sm:hidden">
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-2xl border border-white/12 bg-white/12 px-5 py-3 text-sm font-black text-white shadow-soft-lift backdrop-blur-2xl transition active:scale-[0.98]"
        >
          <ShoppingBag size={19} />
          السلة
          {cartCount > 0 ? (
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-luxury-mint px-1 text-xs text-luxury-black">
              {cartCount}
            </span>
          ) : null}
        </button>

        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="grid h-14 w-14 place-items-center rounded-2xl bg-luxury-mint text-luxury-black shadow-green-glow transition active:scale-[0.98]"
          aria-label="طلب عبر واتساب"
        >
          <MessageCircle size={22} />
        </button>
      </div>

      <a
        href={`${restaurantInfo.whatsappBaseUrl}/${whatsappPhone}?text=${encodeURIComponent(
          "مرحباً مطعم الربيع، أريد الاستفسار عن المنيو."
        )}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 left-4 z-30 grid h-14 w-14 place-items-center rounded-2xl bg-luxury-mint text-luxury-black shadow-green-glow transition hover:-translate-y-1"
        aria-label="دعم واتساب"
      >
        <MessageCircle size={23} />
      </a>

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        whatsappPhone={whatsappPhone}
        onClose={() => setIsCartOpen(false)}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onRemove={removeItem}
      />
    </main>
  );
}