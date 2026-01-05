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
    const snapshot = await db.collection("exp-panel-about").get()
    const docs = snapshot.docs.map(doc => ({...doc.data(), docId: doc.id}))

    return NextResponse.json({
      success: true,
      docs
    })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}