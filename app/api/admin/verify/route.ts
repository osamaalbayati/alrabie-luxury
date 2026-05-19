import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { success: false, message: "تم تعطيل الدخول الإداري مؤقتاً." },
      { status: 503 }
    );
  }

  const body = (await request.json()) as { password?: string };

  if (body.password === adminPassword) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, message: "كلمة المرور غير صحيحة." },
    { status: 401 }
  );
}
