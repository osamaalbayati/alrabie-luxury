import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { MessageCircle } from "lucide-react";
import { restaurantInfo } from "./data/menuData";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo"
});

export const metadata: Metadata = {
  title: {
    default: "مطعم الربيع | فطور، مناقيش، بيتزا، مشاوي، كنافة",
    template: "%s | مطعم الربيع"
  },
  description:
    "منيو مطعم الربيع للطلبات السريعة: فطور عربي، مناقيش ساخنة، بيتزا، مشاوي، وكنافة طازجة مع طلب مباشر عبر واتساب.",
  keywords: [
    "مطعم الربيع",
    "فطور",
    "مناقيش",
    "بيتزا",
    "مشاوي",
    "كنافة",
    "مطعم عربي",
    "طلب واتساب"
  ],
  openGraph: {
    title: "مطعم الربيع",
    description: "فطور • مناقيش • بيتزا • مشاوي • كنافة",
    locale: "ar_IQ",
    siteName: "مطعم الربيع",
    type: "website",
    images: [
      {
        url: "https://alrabee-restaurant.example.com/images/al-rabee/main.jpg",
        width: 1200,
        height: 630,
        alt: "مطعم الربيع"
      }
    ]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsappUrl = `${restaurantInfo.whatsappBaseUrl}/${restaurantInfo.whatsappPhone}`;

  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body>
        {children}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full bg-luxury-mint px-5 py-3 text-sm font-black text-luxury-black shadow-[0_20px_60px_rgba(16,185,129,0.18)] transition hover:scale-105 hover:bg-luxury-green"
          aria-label="تواصل عبر واتساب"
        >
          <MessageCircle size={18} />
          واتساب
        </a>
      </body>
    </html>
  );
}
