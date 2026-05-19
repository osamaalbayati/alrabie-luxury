import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
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
    type: "website"
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
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body>{children}</body>
    </html>
  );
}
