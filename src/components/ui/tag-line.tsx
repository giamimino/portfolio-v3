import React from "react";

export default function TagLine({ label }: { label: string }) {
  return (
    <button className="uppercase bg-linear-to-b from-gray-300 via-5% via-[#ddd] to-black bg-clip-text text-transparent text-sm font-medium">
      {`[ `} {label} {` ]`}
    </button>
  );
}
