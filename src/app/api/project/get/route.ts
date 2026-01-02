import { db } from "@/config/firebase";
import { NextResponse } from "next/server";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message,
  });
}

export async function GET() {
  try {
    const snapshot = await db
      .collection("projects")
      .where("type", "in", ["personal", "client"])
      .get();

      const docs = snapshot.docs.map(doc => ({
        docId: doc,
        ...doc.data()
      }))

      return NextResponse.json({
        success: true,
        docs
      })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.");
  }
}
