import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-linear-to-tr from-white/5 via-transparent mt-10 px-20 pt-20 pb-10 to-white/5 flex justify-center">
      <div className="flex flex-col max-w-150 items-center">
        <h1 className="text-white text-center text-shadow-67 text-5xl font-bold">
          Ready to take your digital presence to next level?
        </h1>
        <p className="text-white text-center text-shadow-67 mt-10 text-lg">
          Reach out to me today and let's discuss how I can help you achive your
          goals
        </p>
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="flex gap-4 flex-col md:flex-row w-full">
            <button className="relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] focus:outline-none">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#111111_0%,#333333_50%,#AAAAAA_100%)]"></span>
              <span
                className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
             bg-[#000000] px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined"
              >
                <Icon icon={"icon-park-solid:mail"} />
                Send Email
              </span>
            </button>
            <button className="relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] focus:outline-none">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#111111_0%,#333333_50%,#AAAAAA_100%)]"></span>
              <span
                className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
             bg-[#000000] px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined"
              >
                <Icon icon={"mingcute:send-plane-fill"} />
                Contact
              </span>
            </button>
          </div>
        </div>
        <div className="text-white mt-15 text-lg flex flex-col items-center">
          <p className="text-center">Copyright © 2026 Gia Miminoshvili</p>
          <p>
            Design by{" "}
            <Link
              href={"https://krishtasood.in/"}
              target="_blank"
              className="cursor-pointer hover:underline opacity-80 hover:opacity-100 transition-all duration-300"
            >
              Krish Tasood
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
