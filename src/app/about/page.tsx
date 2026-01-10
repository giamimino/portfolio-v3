"use client";
import Section from "@/components/common/section";
import SectionTitle from "@/components/ui/section-title";
import TagLine from "@/components/ui/tag-line";
import { ExpPanelABout } from "@/types/firestore";
import React, { useEffect, useState } from "react";

export default function AboutPage() {
  const [expPanelData, setExpPanelData] = useState<ExpPanelABout[]>([]);
  useEffect(() => {
    fetch("/api/about/expanel/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setExpPanelData(data.docs);
        }
      });
  }, []);
  return (
    <div className="pt-2 pb-4 px-4">
      <Section>
        <div className="flex justify-center">
          <TagLine label="About" />
        </div>
        <div className="flex flex-col gap-3.5">
          {expPanelData.map(e => (
            <div key={e.docId} className="flex flex-col items-start gap-1">
              <SectionTitle size={8}>{e.title}</SectionTitle>
              <p className="text-grey-70 text-lg">{e.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
