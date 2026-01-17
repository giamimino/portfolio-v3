import {
  MESSAGE_SEND_ERROR,
  MESSAGE_SEND_SUCCESS,
} from "@/constants/message.constants";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { template }: { template: string } = await req.json();

  const { error } = await resend.emails.send({
    from: "Portfolio v3 <onboarding@resend.dev>",
    to: "devbytesyt@gmail.com",
    subject: "Messaage Form Portfolio v3",
    html: template,
  });

  if (error) {
    return NextResponse.json(
      { success: false, message: MESSAGE_SEND_ERROR },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { success: true, message: MESSAGE_SEND_SUCCESS },
    { status: 200 },
  );
}
