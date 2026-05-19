"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Lock, LogOut, Save, ShieldCheck } from "lucide-react";
import {
  MENU_IMAGE_SCALE_STORAGE_KEY,
  MENU_ITEMS_STORAGE_KEY,
  WHATSAPP_PHONE_STORAGE_KEY,
  type MenuItem,
  categories,
  getDefaultProducts,
} from "../data/menuData";

const ADMIN_AUTH_KEY = "alrabee_admin_authenticated_v1";

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
      return "9647800000000";
    }

    return localStorage.getItem(WHATSAPP_PHONE_STORAGE_KEY) ?? "9647800000000";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedScale = localStorage.getItem(MENU_IMAGE_SCALE_STORAGE_KEY);
    if (savedScale) {
      setImageScale(savedScale);
    }
  }, []);

  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [imageScale, setImageScale] = useState("1");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedAuth = sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
    setIsAuthenticated(storedAuth);

    const verifyCookie = async () => {
      try {
        const response = await fetch("/api/admin/check");
        if (response.ok) {
          sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
          setIsAuthenticated(true);
        }
      } catch {
        // ignore network failures, fallback to sessionStorage only
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyCookie();
  }, []);

  const signIn = async () => {
    setError("");

    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
        setIsAuthenticated(true);
        setPassword("");
        setError("");
      } else {
        setError(data.message || "كلمة المرور غير صحيحة.");
      }
    } catch {
      setError("فشل التحقق. حاول مرة أخرى.");
    }
  };

  const logout = async () => {
    if (typeof window !== "undefined") {
      await fetch("/api/admin/logout", { method: "POST" });
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    }
    setIsAuthenticated(false);
  };

  const filtered = useMemo(() => {
    if (!query.trim()) return items;

    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }, [items, query]);

  const updateItem = (id: string, key: keyof MenuItem, value: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [key]: key === "price" ? Number(value || 0) : value,
            }
          : item
      )
    );
  };

  const saveAll = () => {
    if (typeof window === "undefined") return;

    localStorage.setItem(MENU_ITEMS_STORAGE_KEY, JSON.stringify(items));
    localStorage.setItem(WHATSAPP_PHONE_STORAGE_KEY, phone.trim());
    localStorage.setItem(MENU_IMAGE_SCALE_STORAGE_KEY, imageScale.trim() || "1");
    setMessage("تم الحفظ بنجاح");
  };

  const resetDefaults = () => {
    const defaults = getDefaultProducts();
    setItems(defaults);

    if (typeof window !== "undefined") {
      localStorage.setItem(MENU_ITEMS_STORAGE_KEY, JSON.stringify(defaults));
    }

    setMessage("تمت إعادة ضبط المنيو");
  };

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-black px-4 py-12 text-white sm:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-lg font-semibold text-white/70">جاري التحقق من صلاحية الوصول...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black px-4 py-12 text-white sm:px-8">
        <div className="mx-auto max-w-lg rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-soft-lift">
          <div className="mb-6 flex items-center gap-3 text-white/80">
            <div className="grid h-14 w-14 place-items-center rounded-3xl bg-luxury-mint text-luxury-black shadow-green-glow">
              <Lock size={24} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-luxury-mint">الوصول الآمن</p>
              <h1 className="mt-2 text-3xl font-black text-white">لوحة إدارة مخفية</h1>
            </div>
          </div>

          <p className="mb-8 text-sm leading-7 text-white/65">
            أدخل كلمة المرور الخاصة بالمسؤول للوصول إلى واجهة إدارة المنيو والواتساب.
          </p>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-white/75">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-3xl border border-white/15 bg-black/30 px-4 py-4 text-white outline-none transition focus:border-luxury-mint focus:bg-black/40"
              placeholder="********"
            />
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <button
              type="button"
              onClick={signIn}
              className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-3xl bg-luxury-mint px-5 py-4 text-base font-black text-luxury-black transition hover:scale-[1.01]"
            >
              <ShieldCheck size={18} />
              تسجيل الدخول
            </button>
          </div>

          <p className="mt-8 text-sm text-white/50">
            إذا لم يكن لديك كلمة مرور، فهذه الصفحة سرية ومحمية.
          </p>

          <div className="mt-8 text-center text-sm text-white/40">
            <Link href="/" className="underline hover:text-white">
              العودة للموقع العام
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black">لوحة إدارة المنيو</h1>
            <p className="mt-1 text-sm text-white/60">تحكم آمن في بيانات المنيو ورقم واتساب الطلبات.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-luxury-mint hover:text-luxury-mint"
            >
              <LogOut size={18} /> تسجيل الخروج
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-luxury-mint hover:text-luxury-mint"
            >
              الرجوع للموقع
            </Link>
          </div>
        </div>

        <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft-lift sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-luxury-mint">إعدادات الطلب</p>
              <h2 className="mt-2 text-2xl font-black text-white">رقم واتساب المنيو</h2>
            </div>
            <div className="flex flex-col gap-3 sm:max-w-md">
              <label className="grid gap-2 text-sm text-white/65">
                مقياس عرض الصور
                <input
                  type="number"
                  value={imageScale}
                  onChange={(e) => setImageScale(e.target.value)}
                  min="0.7"
                  max="1.3"
                  step="0.05"
                  className="h-14 w-full rounded-3xl border border-white/15 bg-black/30 px-4 text-white outline-none transition focus:border-green-400 focus:bg-black/40"
                  placeholder="1"
                />
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-14 w-full rounded-3xl border border-white/15 bg-black/30 px-4 text-white outline-none transition focus:border-green-400 focus:bg-black/40"
                placeholder="9647804000463"
              />
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={saveAll}
                  className="rounded-3xl bg-luxury-mint px-5 py-3 text-sm font-black text-luxury-black transition hover:scale-[1.01]"
                >
                  <Save size={16} /> حفظ
                </button>
                <button
                  type="button"
                  onClick={resetDefaults}
                  className="rounded-3xl border border-white/15 px-5 py-3 text-sm font-black text-white transition hover:border-luxury-mint"
                >
                  استعادة الافتراضيات
                </button>
              </div>
              {message ? <p className="text-sm text-green-400">{message}</p> : null}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <section
              key={category.id}
              className="rounded-3xl border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">{category.title}</h2>
                  <p className="mt-1 text-sm text-white/50">{category.description}</p>
                </div>
                <p className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/70">
                  {category.subtitle}
                </p>
              </div>

              <div className="grid gap-3">
                {filtered
                  .filter((item) => item.categoryId === category.id)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 md:grid-cols-[1.5fr_0.9fr]"
                    >
                      <div className="space-y-2">
                        <input
                          value={item.name}
                          onChange={(e) => updateItem(item.id, "name", e.target.value)}
                          className="h-12 w-full rounded-2xl border border-white/15 bg-black/30 px-4 text-white outline-none transition focus:border-green-400"
                        />
                        <input
                          value={item.notes ?? ""}
                          onChange={(e) => updateItem(item.id, "notes", e.target.value)}
                          placeholder="ملاحظات"
                          className="h-12 w-full rounded-2xl border border-white/15 bg-black/30 px-4 text-white outline-none transition focus:border-green-400"
                        />
                      </div>
                      <div className="grid gap-3">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, "price", e.target.value)}
                          className="h-12 w-full rounded-2xl border border-white/15 bg-black/30 px-4 text-white outline-none transition focus:border-green-400"
                        />
                        <p className="text-sm text-white/60">ID: {item.id}</p>
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
