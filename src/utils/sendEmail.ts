import { Resend } from "resend";

export async function sendEmail(template: string, from: string) {
  const resend = new Resend();

  const {error} = await resend.emails.send({
    from,
    to: 'devbytesyt@gmail.com'
  })
}
