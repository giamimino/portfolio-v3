"use client";
import Section from "@/components/common/section";
import SectionTitle from "@/components/ui/section-title";
import React from "react";
import { ProjectInput } from "../admin/dashboard/project-upload-components";

const fields = [
  { id: "name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "title", label: "Title" },
];

export default function ContactPage() {
  return (
    <div className="pt-5 px-4">
      <Section>
        <div className="flex justify-center">
          <SectionTitle size={6}>Contact...</SectionTitle>
        </div>
        <form className="w-full flex justify-center mt-5">
          <div className="flex flex-col gap-2.5 w-1/4 items-center">
            {fields.map((f, i) => (
              <div key={`${f.id}-key`} className="flex flex-col gap-1 w-full animate-hideUpDown opacity-0" style={{
                animationDelay: `${i / 10}s`
              }}>
                <label htmlFor={f.id} className="font-medium text-white">
                  {f.label}
                </label>
                <ProjectInput id={f.id} />
              </div>
            ))}
            <div className="flex flex-col gap-1 w-full animate-hideUpDown opacity-0" style={{ animationDelay: `${(fields.length + 1) / 10}s` }}>
              <label htmlFor={"message"} className="font-medium text-white">
                Message
              </label>
              <textarea
                className="py-2 px-1.5 flex text-white w-full
      bg-black border border-white rounded-sm min-h-30"
                id={"Message"}
              ></textarea>
            </div>
          <button
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
