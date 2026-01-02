"use client";
import SectionTitle from "@/components/ui/section-title";
import { useNotificationsContext } from "@/context/NotificationsContext";
import { Icon } from "@iconify/react";
import cuid from "cuid";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

export default function AdminVerificationPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [paste, setPaste] = useState(false);
  const router = useRouter()
  const { addNotification } = useNotificationsContext();
  const handlePaste = async () => {
    if (!inputRef.current) return;

    const clipboard = await navigator.clipboard.readText();
    if (clipboard) {
      inputRef.current.value = clipboard;
      setPaste(true);
    }
  };

  const handleCheck = async () => {
    try {
      if (!inputRef.current) return;
      const res = await fetch("/api/admin/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: inputRef.current.value }),
      });
      const data = await res.json();

      if (data.error) {
        addNotification({ id: cuid(), text: data.error });
      } else if(data.success) {
        router.push("/admin/dashboard")
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div
        className="py-4 px-8 rounded-xl border border-1-b-active w-fit fixed top-1/2 left-1/2 -translate-1/2 flex flex-col gap-3.5"
      >
        <span className="text-base">
          <SectionTitle size={6}>Type Admin key</SectionTitle>
        </span>
        <div className="flex gap-2.5 items-center ">
          <input
            ref={inputRef}
            className="border border-1-b transition-all duration-500 py-0.5 px-2 text-white bg-white/3 backdrop-blur-xs"
            type="text"
            placeholder="key..."
          />
          <button
            onClick={handlePaste}
            className="text-white text-sm w-6 h-6 rounded-sm border border-white/60 cursor-pointer flex justify-center items-center relative"
          >
            <Icon icon={"ic:baseline-content-paste"} />
            {paste && (
              <div className="absolute animate-hideUpDown opacity-0 bg-white/3 text-white left-1/2 -top-10/9 w-4.5 h-4.5 text-[8px] -translate-x-1/2 rounded-sm border border-1-b flex justify-center items-center">
                <Icon icon={"mingcute:check-fill"} />
              </div>
            )}
          </button>
        </div>
        <button
          onClick={handleCheck}
          className={`text-sm w-6 h-6 rounded-sm border bg-white border-white 
            cursor-pointer flex justify-center items-center relative 
            self-center hover:bg-black transition-all duration-300`}
        >
          <Icon
            className="mix-blend-exclusion text-white"
            icon={"hugeicons:sent"}
          />
        </button>
      </div>
    </div>
  );
}
