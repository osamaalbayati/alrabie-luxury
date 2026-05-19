"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import type { MenuItem, MenuItemOption } from "../data/menuData";
import { formatIQD, restaurantInfo } from "../data/menuData";

export type CartLine = {
  id: string;
  product: MenuItem;
  selectedOption?: MenuItemOption;
  quantity: number;
};

type CartDrawerProps = {
  isOpen: boolean;
  items: CartLine[];
  whatsappPhone: string;
  onClose: () => void;
  onIncrement: (lineId: string) => void;
  onDecrement: (lineId: string) => void;
  onRemove: (lineId: string) => void;
};

type CustomerInfo = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

const emptyCustomer: CustomerInfo = {
  name: "",
  phone: "",
  address: "",
  notes: "",
};

export default function CartDrawer({
  isOpen,
  items,
  whatsappPhone,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
}: CartDrawerProps) {
  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer);

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + (item.selectedOption?.price ?? item.product.price) * item.quantity,
        0
      ),
    [items]
  );

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const updateCustomer = (field: keyof CustomerInfo, value: string) => {
    setCustomer((current) => ({ ...current, [field]: value }));
  };

  const buildOrderText = () => {
    const itemLines = items.map((item, index) => {
      const itemPrice = item.selectedOption?.price ?? item.product.price;
      const itemLabel = item.selectedOption
        ? `${item.product.name} (${item.selectedOption.label})`
        : item.product.name;
      const lineTotal = itemPrice * item.quantity;
      return `🍴 ${index + 1}. ${itemLabel} × ${item.quantity} = ${formatIQD(
        lineTotal
      )}`;
    });

    return [
      `🍽️ طلب جديد — ${restaurantInfo.name}`,
      "━━━━━━━━━━━━━━━━━━",
      `🕒 وقت الطلب: ${new Date().toLocaleString("ar-IQ")}`,
      `🧾 رقم الطلب: #${Math.floor(Math.random() * 9000) + 1000}`,
      "",
      "👤 معلومات الزبون",
      `🙍 الاسم: ${customer.name || "-"}`,
      `📞 الهاتف: ${customer.phone || "-"}`,
      `📍 العنوان: ${customer.address || "-"}`,
      `📝 الملاحظات: ${customer.notes || "لا توجد"}`,
      "",
      "🛒 تفاصيل الطلب",
      "━━━━━━━━━━━━━━━━━━",
      ...itemLines,
      "",
      "━━━━━━━━━━━━━━━━━━",
      `📦 عدد القطع: ${cartCount}`,
      `💵 المجموع الكلي: ${formatIQD(total)}`,
      "",
      "🚚 نوع الطلب: توصيل",
      "💳 الدفع: كاش عند الاستلام",
      "",
      "❤️ شكراً لاختياركم مطعم الربيع",
      "نتمنى لكم وجبة شهية 😍",
    ].join("\n");
  };

  const sendOrder = () => {
    if (items.length === 0) return;

    const url = `${restaurantInfo.whatsappBaseUrl}/${whatsappPhone}?text=${encodeURIComponent(
      buildOrderText()
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const canOrder =
    items.length > 0 &&
    Boolean(customer.name.trim()) &&
    Boolean(customer.phone.trim()) &&
    Boolean(customer.address.trim());

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-label="إغلاق السلة"
      />

      <aside
        className={`absolute inset-y-0 right-0 flex w-full max-w-[430px] flex-col border-l border-white/10 bg-[#050505]/95 shadow-2xl backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="سلة الطلب"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="text-right">
            <p className="text-2xl font-black text-white">سلة الطلب</p>
            <p className="text-sm font-semibold text-white/50">{cartCount} صنف</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-green-400 hover:text-green-400"
            aria-label="إغلاق"
          >
            <X size={21} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="grid flex-1 place-items-center px-6 text-center">
            <div className="max-w-xs">
              <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-3xl border border-green-400/20 bg-green-400/10 text-green-300 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                <ShoppingBag size={32} />
              </div>
              <h2 className="text-2xl font-black text-white">السلة فارغة</h2>
              <p className="mt-3 leading-7 text-white/55">
                لم تضف أي طبق بعد. المنيو ينتظر أول اختيار من الربيع.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="hide-scrollbar flex-1 overflow-y-auto px-5 py-5">
              <div className="space-y-3">
              <AnimatePresence initial={false}>
                {items.map((item) => {
                  const itemPrice = item.selectedOption?.price ?? item.product.price;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-3xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:border-luxury-mint/40"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-black leading-7 text-white">
                            {item.product.name}
                            {item.selectedOption ? (
                              <span className="block text-sm font-semibold text-white/50">
                                {item.selectedOption.label}
                              </span>
                            ) : null}
                          </h3>
                          <p className="mt-1 text-sm text-white/50">
                            {formatIQD(itemPrice)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/20 text-white/55 transition hover:border-red-400/60 hover:text-red-300"
                          aria-label={`حذف ${item.product.name}`}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 p-1">
                          <button
                            type="button"
                            onClick={() => onIncrement(item.id)}
                            className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black transition hover:bg-green-400"
                            aria-label={`زيادة ${item.product.name}`}
                          >
                            <Plus size={17} />
                          </button>

                          <span className="grid h-10 min-w-10 place-items-center px-2 text-base font-black text-white">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => onDecrement(item.id)}
                            className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/15"
                            aria-label={`تقليل ${item.product.name}`}
                          >
                            <Minus size={17} />
                          </button>
                        </div>

                        <p className="text-sm font-black text-green-400">
                          {formatIQD(itemPrice * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

              <div className="mt-6 rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-5 shadow-[0_10px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white">معلومات الطلب</h3>
                    <p className="mt-1 text-sm text-white/45">
                      أكمل البيانات لإرسال الطلب
                    </p>
                  </div>

                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-green-400/20 bg-green-400/10 text-green-300 shadow-[0_0_25px_rgba(34,197,94,0.18)]">
                    📋
                  </div>
                </div>

                <div className="grid gap-4">
                  <label className="group grid gap-2">
                    <span className="text-sm font-bold text-white/65">الاسم الكامل</span>

                    <div className="relative">
                      <input
                        value={customer.name}
                        onChange={(event) => updateCustomer("name", event.target.value)}
                        className="
                          min-h-14
                          w-full
                          rounded-3xl
                          border border-white/10
                          bg-black/30
                          px-5
                          text-[16px]
                          text-white
                          backdrop-blur-xl
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-white/25
                          focus:border-green-400
                          focus:bg-black/40
                          focus:shadow-[0_0_30px_rgba(34,197,94,0.25)]
                        "
                        placeholder="اكتب الاسم الكامل"
                      />
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                        👤
                      </div>
                    </div>
                  </label>

                  <label className="group grid gap-2">
                    <span className="text-sm font-bold text-white/65">رقم الهاتف</span>

                    <div className="relative">
                      <input
                        value={customer.phone}
                        onChange={(event) => updateCustomer("phone", event.target.value)}
                        inputMode="tel"
                        className="
                          min-h-14
                          w-full
                          rounded-3xl
                          border border-white/10
                          bg-black/30
                          px-5
                          text-[16px]
                          text-white
                          backdrop-blur-xl
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-white/25
                          focus:border-green-400
                          focus:bg-black/40
                          focus:shadow-[0_0_30px_rgba(34,197,94,0.25)]
                        "
                        placeholder="07xxxxxxxxx"
                      />
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                        📞
                      </div>
                    </div>
                  </label>

                  <label className="group grid gap-2">
                    <span className="text-sm font-bold text-white/65">العنوان</span>

                    <div className="relative">
                      <input
                        value={customer.address}
                        onChange={(event) => updateCustomer("address", event.target.value)}
                        className="
                          min-h-14
                          w-full
                          rounded-3xl
                          border border-white/10
                          bg-black/30
                          px-5
                          text-[16px]
                          text-white
                          backdrop-blur-xl
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-white/25
                          focus:border-green-400
                          focus:bg-black/40
                          focus:shadow-[0_0_30px_rgba(34,197,94,0.25)]
                        "
                        placeholder="المنطقة، الشارع، أقرب نقطة"
                      />
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                        📍
                      </div>
                    </div>
                  </label>

                  <label className="group grid gap-2">
                    <span className="text-sm font-bold text-white/65">ملاحظات الطلب</span>

                    <div className="relative">
                      <textarea
                        value={customer.notes}
                        onChange={(event) => updateCustomer("notes", event.target.value)}
                        className="
                          min-h-32
                          w-full
                          resize-none
                          rounded-3xl
                          border border-white/10
                          bg-black/30
                          px-5
                          py-4
                          text-[16px]
                          text-white
                          backdrop-blur-xl
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-white/25
                          focus:border-green-400
                          focus:bg-black/40
                          focus:shadow-[0_0_30px_rgba(34,197,94,0.25)]
                        "
                        placeholder="مثال: بدون بصل، زيادة جبن..."
                      />
                      <div className="pointer-events-none absolute left-4 top-5 text-white/30">
                        📝
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-black/40 px-5 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] backdrop-blur-2xl">
              <button
                type="button"
                onClick={sendOrder}
                disabled={!canOrder}
                className={`
                  relative
                  inline-flex
                  min-h-16
                  w-full
                  items-center
                  justify-center
                  gap-3
                  overflow-hidden
                  rounded-[28px]
                  px-6
                  py-4
                  text-lg
                  font-black
                  transition-all
                  duration-300
                  active:scale-[0.98]

                  ${
                    canOrder
                      ? `
                        bg-gradient-to-r
                        from-green-400
                        via-emerald-400
                        to-green-500
                        text-black
                        shadow-[0_12px_45px_rgba(34,197,94,0.45)]
                        hover:scale-[1.015]
                        hover:shadow-[0_16px_55px_rgba(34,197,94,0.55)]
                      `
                      : `
                        cursor-not-allowed
                        border border-white/10
                        bg-white/10
                        text-white/35
                      `
                  }
                `}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,white,transparent_60%)] opacity-20" />
                <Send size={22} className="relative z-10" />
                <span className="relative z-10">إرسال الطلب عبر واتساب</span>
              </button>

              <p className="mt-3 text-center text-xs leading-6 text-white/35">
                بالضغط على الزر سيتم تحويلك مباشرة إلى واتساب لإرسال الطلب
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}