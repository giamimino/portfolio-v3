"use client";
import Section from "@/components/common/section";
import SectionTitle from "@/components/ui/section-title";
import React, { useRef } from "react";
import { ProjectInput } from "../admin/dashboard/project-upload-components";
import { useNotificationsContext } from "@/context/NotificationsContext";
import { EMPTY_VALUES_ERROR } from "@/constants/message.constants";
import cuid from "cuid";

const fields = [
  { id: "name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "title", label: "Title" },
];

export default function ContactPage() {
  const { addNotification } = useNotificationsContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;

    if (!name || !phone || !email || !title || !message) {
      addNotification({
        id: "EMPTY_VALUES_ERROR_01",
        text: EMPTY_VALUES_ERROR,
      });
      return;
    }

    const template = `
        <div style="margin:0; padding:0; background:#f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; font-family: Arial, sans-serif;">
                  
                  <tr>
                    <td style="padding:20px; text-align:center; background:#111; color:#ffffff;">
                      <h1 style="margin:0; font-size:24px;">Portfolio v3</h1>
                    </td>

                  <tr>
                    <td style="padding:30px; color:#333333; font-size:16px; line-height:1.5;">
                      <p style="margin-top:0;">Hi Gia,</p>

                      <p>
                        You have new message from ${name}
                      </p>
              
                      <div>
                      <h1>${title}</h1>
                      <p>
                        ${message}
                      </p>
                      </div>

                      <div style="width: 100%; height: 1px; background-color: #2563eb;"></div>
                      <p style="margin: 10px 0 0 0;">phone: ${phone}</p>
                      <p style="margin: 0;">email: ${email}</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:20px; text-align:center; font-size:12px; color:#999;">
                      © 2026 portfolio v3<br />
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </div>
    `;

    await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ template })
    })
      .then((res) => res.json())
      .then((result) => {
        addNotification({ id: cuid(), text: result.message });
      });
  };

  return (
    <div className="pt-5 px-4">
      <Section>
        <div className="flex justify-center">
          <SectionTitle size={6}>Contact...</SectionTitle>
        </div>
        <form
          className="w-full flex justify-center mt-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2.5 w-1/4 max-lg:w-1/3 max-md:w-1/2 max-sm:w-full items-center">
            {fields.map((f, i) => (
              <div
                key={`${f.id}-key`}
                className="flex flex-col gap-1 w-full animate-hideUpDown opacity-0"
                style={{
                  animationDelay: `${i / 10}s`,
                }}
              >
                <label htmlFor={f.id} className="font-medium text-white">
                  {f.label}
                </label>
                <ProjectInput id={f.id} />
              </div>
            ))}
            <div
              className="flex flex-col gap-1 w-full animate-hideUpDown opacity-0"
              style={{ animationDelay: `${(fields.length + 1) / 10}s` }}
            >
              <label htmlFor={"message"} className="font-medium text-white">
                Message
              </label>
              <textarea
                className="py-2 px-1.5 flex text-white w-full
      bg-black border border-white rounded-sm min-h-30"
                name={"message"}
                id={"message"}
              ></textarea>
            </div>
            <button
              type="submit"
              className="p-3 rounded-2xl backdrop-blur-lg border 
      border-white/10 from-black/60 
      to-black/40 shadow-lg hover:shadow-2xl 
      hover:shadow-white/20 hover:scale-110 hover:rotate-1 
      active:scale-95 active:rotate-0 transition-all 
      duration-300 ease-out cursor-pointer 
      hover:border-white/30 hover:bg-linear-to-tr 
      hover:from-white/10 hover:to-black/40 group 
      relative overflow-hidden  mt-2.5 w-full animate-hideUpDown opacity-0"
              style={{
                animationDelay: `${(fields.length + 2) / 10}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              <div className="relative z-10 text-white mix-blend-exclusion">
                submit
              </div>
            </button>
          </div>
        </form>
      </Section>
    </div>
  );
}
