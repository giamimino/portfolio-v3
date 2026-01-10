export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_KEY_HASH } from "../../../../../server-config";

export async function POST(req: Request) {
  try {
    const { key }: { key: string } = await req.json();
    if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });

    const trimmedKey = key.trim();

    const valid = await bcrypt.compare(trimmedKey, ADMIN_KEY_HASH);
    if (!valid) return NextResponse.json({ error: "Invalid key" }, { status: 401 });

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 12);
    const session = await prisma.adminSession.create({ data: { expiresAt: expires } });

    (await cookies()).set("admin_session", session.id, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return NextResponse.json({ success: true, valid });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
