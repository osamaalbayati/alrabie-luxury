import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "admin_session";

function timingSafeEqual(a?: string, b?: string) {
  if (!a || !b) return false;
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function createAdminToken(secret: string) {
  return crypto.createHmac("sha256", secret).update("admin-session").digest("hex");
}

export async function GET(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_AUTH_SECRET ?? adminPassword;

  if (!adminPassword || !adminSecret) {
    return NextResponse.json(
      { success: false, message: "تم تعطيل الدخول الإداري مؤقتاً." },
      { status: 503 }
    );
  }

  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (token && timingSafeEqual(token, createAdminToken(adminSecret))) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
