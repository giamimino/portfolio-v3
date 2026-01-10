export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("admin_session")?.value as string;
    const now = new Date();

    if (!sessionId)
      return NextResponse.json(
        { error: "session has expired." },
        { status: 400 }
      );

    const session = await prisma.adminSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.expiresAt.getTime() < now.getTime()) {
      cookieStore.delete("admin_session");
      return NextResponse.json(
        { error: "session can't be found or expired." },
        { status: 400 }
      );
    }

    cookieStore.set("admin_session", session.id, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    await prisma.adminSession.update({
      where: { id: session.id },
      data: {
        expiresAt: new Date(now.getTime() + 12 * 60 * 60 * 1000)
      }
    })

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
