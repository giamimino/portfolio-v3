import { ContactsSocial } from "@/constants/contacts.constant";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

export default function Contact() {
  const [isCopy, setIsCopy] = useState<string>("");
  const handleClick = async (
    type: (typeof ContactsSocial)[0]["type"],
    value: string,
    key: string
  ) => {
    if (type === "redirect") {
      window.open(value, "_blank");
      return;
    }
    if (type === "copy") {
      await navigator.clipboard.writeText(value);
      setIsCopy(key);
    }
  };

  useEffect(() => {
    if (!isCopy.trim()) return;
    const timer = setTimeout(() => setIsCopy(""), 3000);

    return () => clearTimeout(timer);
  }, [isCopy]);

  return (
    <div className="border-[0.5px] border-white/10 w-full flex flex-wrap">
      {ContactsSocial.map((c) => (
        <div
          key={`${c.provider}-${c.account}`}
          className="p-6 text-white flex items-center gap-6 border-[0.5px] border-white/10 w-1/2 cursor-pointer hover:bg-white/3 transition-all group relative"
          onClick={() =>
            handleClick(
              c.type,
              c.redirectUrl ?? c.copyValue,
              `${c.provider}-${c.account}`
            )
          }
        >
          <Icon icon={c.icon} className="text-3xl" />
          <div className="flex flex-col">
            <h1 className="font-semibold text-lg">{c.provider}</h1>
            <p className="text-grey-70 text-[14px]">{c.account}</p>
          </div>
          <div className="absolute right-6">
            {`${c.provider}-${c.account}` !== isCopy && (
              <Icon
                icon={c.type === "redirect" ? "ooui:arrow-down" : "lucide:copy"}
                className={`${
                  c.type === "redirect" ? "-rotate-135" : ""
                } text-grey-70 group-hover:text-white`}
              />
            )}
            {`${c.provider}-${c.account}` === isCopy && (
              <Icon
                icon={"ic:round-check"}
                className={`text-green-600 text-xl`}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
