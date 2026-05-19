"use client";

import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import type { MenuItem } from "../data/menuData";
import { formatIQD, restaurantInfo } from "../data/menuData";

export type CartLine = {
  product: MenuItem;
  quantity: number;
};

type CartDrawerProps = {
  isOpen: boolean;
  items: CartLine[];
  whatsappPhone: string;
  onClose: () => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
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
  notes: ""
};

export default function CartDrawer({
  isOpen,
  items,
  whatsappPhone,
  onClose,
  onIncrement,
  onDecrement,
  onRemove
}: CartDrawerProps) {
  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

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
      const lineTotal = item.product.price * item.quantity;
      return `${index + 1}. ${item.product.name} × ${item.quantity} - ${formatIQD(lineTotal)}`;
    });

    return [
      `طلب جديد من ${restaurantInfo.name}`,
      "",
      `الاسم: ${customer.name || "-"}`,
      `رقم الهاتف: ${customer.phone || "-"}`,
      `العنوان: ${customer.address || "-"}`,
      `ملاحظات: ${customer.notes || "-"}`,
      "",
      "الطلبات:",
      ...itemLines,
      "",
      `عدد الأصناف: ${cartCount}`,
      `المجموع: ${formatIQD(total)}`
    ].join("\n");
  };

  const sendOrder = () => {
    if (items.length === 0) {
      return;
    }

    const url = `${restaurantInfo.whatsappBaseUrl}/${whatsappPhone}?text=${encodeURIComponent(buildOrderText())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const canOrder =
    items.length > 0 &&
    Boolean(customer.name.trim()) &&
    Boolean(customer.phone.trim()) &&
    Boolean(customer.address.trim());

  return (
    <div
      className={`fixed inset-0 z-50 transition duration-300 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-label="إغلاق السلة"
      />

      <aside
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/10 bg-[#080808]/95 shadow-soft-lift backdrop-blur-2xl transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="سلة الطلب"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-2xl font-black text-white">سلة الطلب</p>
            <p className="text-sm font-semibold text-white/48">{cartCount} صنف</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-luxury-mint hover:text-luxury-mint"
            aria-label="إغلاق"
          >
            <X size={21} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="grid flex-1 place-items-center px-6 text-center">
            <div className="max-w-xs">
              <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-3xl border border-luxury-mint/25 bg-luxury-green/15 text-luxury-mint shadow-green-glow">
                <ShoppingBag size={32} />
              </div>
              <h2 className="text-2xl font-black text-white">السلة فارغة</h2>
              <p className="mt-3 leading-7 text-white/58">
                لم تضف أي طبق بعد. المنيو ينتظر أول اختيار من الربيع.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="hide-scrollbar flex-1 overflow-y-auto px-5 py-5">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-black leading-7 text-white">{item.product.name}</h3>
                        <p className="mt-1 text-sm text-white/50">{formatIQD(item.product.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(item.product.id)}
                        className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/20 text-white/55 transition hover:border-red-400/60 hover:text-red-300"
                        aria-label={`حذف ${item.product.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 p-1">
                        <button
                          type="button"
                          onClick={() => onIncrement(item.product.id)}
                          className="grid h-9 w-9 place-items-center rounded-xl bg-white text-luxury-black transition hover:bg-luxury-mint"
                          aria-label={`زيادة ${item.product.name}`}
                        >
                          <Plus size={17} />
                        </button>
                        <span className="grid h-9 min-w-10 place-items-center text-base font-black text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onDecrement(item.product.id)}
                          className="grid h-9 w-9 place-items-center rounded-xl bg-white/8 text-white transition hover:bg-white/14"
                          aria-label={`تقليل ${item.product.name}`}
                        >
                          <Minus size={17} />
                        </button>
                      </div>
                      <p className="text-sm font-black text-luxury-mint">
                        {formatIQD(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-luxury-mint/20 bg-luxury-green/10 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-white/58">المجموع</span>
                  <span className="text-2xl font-black text-white">{formatIQD(total)}</span>
                </div>

                <div className="grid gap-3">
                  <label className="grid gap-2 text-sm font-bold text-white/70">
                    الاسم
                    <input
                      value={customer.name}
                      onChange={(event) => updateCustomer("name", event.target.value)}
                      className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-luxury-mint"
                      placeholder="اكتب الاسم"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-white/70">
                    رقم الهاتف
                    <input
                      value={customer.phone}
                      onChange={(event) => updateCustomer("phone", event.target.value)}
                      inputMode="tel"
                      className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-luxury-mint"
                      placeholder="07xxxxxxxxx"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-white/70">
                    العنوان
                    <input
                      value={customer.address}
                      onChange={(event) => updateCustomer("address", event.target.value)}
                      className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-luxury-mint"
                      placeholder="المنطقة، الشارع، أقرب نقطة"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-white/70">
                    ملاحظات
                    <textarea
                      value={customer.notes}
                      onChange={(event) => updateCustomer("notes", event.target.value)}
                      className="min-h-24 resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-luxury-mint"
                      placeholder="أي تفاصيل إضافية للطلب"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="safe-bottom border-t border-white/10 bg-black/35 px-5 pt-4">
              <button
                type="button"
                onClick={sendOrder}
                disabled={!canOrder}
                className={`inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 text-base font-black transition ${
                  canOrder
                    ? "bg-luxury-mint text-luxury-black shadow-green-glow hover:-translate-y-0.5"
                    : "cursor-not-allowed border border-white/10 bg-white/12 text-white/38 shadow-none"
                }`}
              >
                <Send size={19} />
                إرسال الطلب عبر واتساب
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
