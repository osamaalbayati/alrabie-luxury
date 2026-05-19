"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MENU_ITEMS_STORAGE_KEY,
  WHATSAPP_PHONE_STORAGE_KEY,
  type MenuItem,
  categories,
  getDefaultProducts
} from "../data/menuData";

export default function AdminPage() {
  const [items, setItems] = useState<MenuItem[]>(() => {
    if (typeof window === "undefined") {
      return getDefaultProducts();
    }
    try {
      const saved = localStorage.getItem(MENU_ITEMS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as MenuItem[]) : getDefaultProducts();
    } catch {
      return getDefaultProducts();
    }
  });
  const [phone, setPhone] = useState(() => {
    if (typeof window === "undefined") {
      return "9647804000463";
    }
    return localStorage.getItem(WHATSAPP_PHONE_STORAGE_KEY) ?? "9647804000463";
  });
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return items;
    }
    const q = query.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(q) || item.id.toLowerCase().includes(q));
  }, [items, query]);

  const updateItem = (id: string, key: keyof MenuItem, value: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [key]: key === "price" ? Number(value || 0) : value
            }
          : item
      )
    );
  };

  const saveAll = () => {
    localStorage.setItem(MENU_ITEMS_STORAGE_KEY, JSON.stringify(items));
    localStorage.setItem(WHATSAPP_PHONE_STORAGE_KEY, phone.trim());
    setMessage("تم الحفظ بنجاح");
  };

  const resetDefaults = () => {
    const defaults = getDefaultProducts();
    setItems(defaults);
    localStorage.setItem(MENU_ITEMS_STORAGE_KEY, JSON.stringify(defaults));
    setMessage("تمت إعادة ضبط المنيو الافتراضي");
  };

  return (
    <main className="min-h-screen bg-luxury-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-black">لوحة إدارة المنيو</h1>
          <Link href="/" className="rounded-xl border border-white/15 px-4 py-2 font-bold hover:border-luxury-mint">
            الرجوع للموقع
          </Link>
        </div>

        <div className="glass-panel mb-6 rounded-2xl p-4">
          <label className="mb-3 block text-sm font-bold">رقم واتساب (صيغة دولية)</label>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mb-4 h-12 w-full rounded-xl border border-white/15 bg-black/25 px-4 text-white outline-none focus:border-luxury-mint"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="بحث عن صنف"
            className="h-12 w-full rounded-xl border border-white/15 bg-black/25 px-4 text-white outline-none focus:border-luxury-mint"
          />
          <div className="mt-4 flex gap-3">
            <button onClick={saveAll} className="rounded-xl bg-luxury-mint px-4 py-2 font-black text-black">
              حفظ التعديلات
            </button>
            <button onClick={resetDefaults} className="rounded-xl border border-white/20 px-4 py-2 font-black">
              استعادة الافتراضي
            </button>
          </div>
          {message ? <p className="mt-3 text-sm text-luxury-mint">{message}</p> : null}
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <section key={category.id} className="glass-panel rounded-2xl p-4">
              <h2 className="mb-4 text-xl font-black">{category.title}</h2>
              <div className="grid gap-3">
                {filtered
                  .filter((item) => item.categoryId === category.id)
                  .map((item) => (
                    <div key={item.id} className="grid gap-2 rounded-xl border border-white/10 bg-black/20 p-3">
                      <div className="grid gap-2 sm:grid-cols-3">
                        <input
                          value={item.name}
                          onChange={(event) => updateItem(item.id, "name", event.target.value)}
                          className="h-10 rounded-lg border border-white/15 bg-black/30 px-3 outline-none focus:border-luxury-mint"
                        />
                        <input
                          type="number"
                          value={item.price}
                          onChange={(event) => updateItem(item.id, "price", event.target.value)}
                          className="h-10 rounded-lg border border-white/15 bg-black/30 px-3 outline-none focus:border-luxury-mint"
                        />
                        <input
                          value={item.notes ?? ""}
                          onChange={(event) => updateItem(item.id, "notes", event.target.value)}
                          placeholder="ملاحظة"
                          className="h-10 rounded-lg border border-white/15 bg-black/30 px-3 outline-none focus:border-luxury-mint"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
