import { db } from "@/config/firebase";
import { NextRequest, NextResponse } from "next/server";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message,
  });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const type = searchParams.get("type");
    const filter = !type ? ["personal", "client"] : [type as string];
    const snapshot = await db
      .collection("projects")
      .where("type", "in", filter)
      .get();

    const docs = snapshot.docs.map((doc) => ({
      docId: doc,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      docs,
    });
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.");
  }
}
