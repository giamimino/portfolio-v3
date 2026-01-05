import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-linear-to-tr from-white/5 overflow-hidden via-transparent px-20 pt-20 pb-10 to-white/5 flex justify-center relative">
      <div className="absolute top-5 left-23 rotate-[70deg]">
        <div
          className="absolute left-0 top-0 h-0.5 w-20 
          rounded-full bg-[linear-gradient(-45deg,rgba(255,255,255,0.2),rgba(0,0,255,0.1))] 
          drop-shadow-[0_0_6px_#fff] animate-starFalling"
        ></div>
        <div
          className="absolute left-10 top-10 h-0.5 w-20 
          rounded-full bg-[linear-gradient(-45deg,rgba(255,255,255,0.2),rgba(0,0,255,0.1))] 
          drop-shadow-[0_0_6px_#fff] animate-starFalling"
          style={{
            animationDelay: "1s"
          }}
        ></div>
        <div
          className="absolute -left-15 -top-15 h-0.5 w-20 
          rounded-full bg-[linear-gradient(-45deg,rgba(255,255,255,0.2),rgba(0,0,255,0.1))] 
          drop-shadow-[0_0_6px_#fff] animate-starFalling"
          style={{
            animationDelay: "1.2s"
          }}
        ></div>
        <div
          className="absolute -left-10 top-30 h-0.5 w-20 
          rounded-full bg-[linear-gradient(-45deg,rgba(255,255,255,0.2),rgba(0,0,255,0.1))] 
          drop-shadow-[0_0_6px_#fff] animate-starFalling"
          style={{
            animationDelay: "1.4s"
          }}
        ></div>
        <div
          className="absolute left-2 -top-5 h-0.5 w-20 
          rounded-full bg-[linear-gradient(-45deg,rgba(255,255,255,0.2),rgba(0,0,255,0.1))] 
          drop-shadow-[0_0_6px_#fff] animate-starFalling"
          style={{
            animationDelay: "1.6s"
          }}
        ></div>
        <div
          className="absolute left-2 -top-50 h-0.5 w-20 
          rounded-full bg-[linear-gradient(-45deg,rgba(255,255,255,0.2),rgba(0,0,255,0.1))] 
          drop-shadow-[0_0_6px_#fff] animate-starFalling"
          style={{
            animationDelay: "1.2s"
          }}
        ></div>
      </div>
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
