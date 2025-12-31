import { NextResponse } from "next/server";
import cuid from "cuid";
import React from "react";
import { Timestamp } from "firebase-admin/firestore";
import { Project } from "@/types/firestore";
import { db } from "@/config/firebase";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message,
  });
}

export async function POST(req: Request) {
  try {
    const { project_values, tags }: { project_values: object; tags: string[] } =
      await req.json();

    const project_id = cuid();
    const created_at = Timestamp.now();

    const data = {
      ...project_values,
      project_id,
      created_at,
      tags,
    } as Project;
    const collection = "projects";
    await db.collection(collection).add(data);

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.");
  }
}
