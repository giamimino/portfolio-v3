import { db } from "@/config/firebase";
import { About } from "@/types/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message,
  });
}

export async function POST(req: Request) {
  try {
    const { values }: { values: object; } = await req.json();

    const createdAt = Timestamp.now();

    const data = {
      ...values,
      createdAt,
    };
    const collection = "about";
    await db.collection(collection).add(data);

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.");
  }
}
