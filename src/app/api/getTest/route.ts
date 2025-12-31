import { db } from "@/config/firebase";
import { NextResponse } from "next/server";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message
  })
}

export async function GET() {
  try {
    const snapshot = await db.collection("projects").get()
    const data = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }))
    return NextResponse.json({
      data
    })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}