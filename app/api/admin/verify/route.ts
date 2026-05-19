import crypto from "crypto";
import { NextResponse } from "next/server";

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60; // 1 hour

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

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_AUTH_SECRET ?? adminPassword;

  if (!adminPassword || !adminSecret) {
    return NextResponse.json(
      { success: false, message: "تم تعطيل الدخول الإداري مؤقتاً." },
      { status: 503 }
    );
  }

  const body = (await request.json()) as { password?: string };

  if (typeof body.password !== "string") {
    return NextResponse.json(
      { success: false, message: "كلمة المرور غير صحيحة." },
      { status: 401 }
    );
  }

  if (timingSafeEqual(body.password, adminPassword)) {
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, createAdminToken(adminSecret), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    return response;
  }

  return NextResponse.json(
    { success: false, message: "كلمة المرور غير صحيحة." },
    { status: 401 }
  );
}
