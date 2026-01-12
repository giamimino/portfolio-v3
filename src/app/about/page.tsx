"use client";
import Section from "@/components/common/section";
import TableOfContents from "@/components/common/TableOfContents";
import MouseProvider from "@/components/providers/MouseProvider";
import InViewport from "@/components/ui/InViewPort";
import SectionTitle from "@/components/ui/section-title";
import TagLine from "@/components/ui/tag-line";
import { GENERIC_ERROR } from "@/constants/message.constants";
import { useNotificationsContext } from "@/context/NotificationsContext";
import { About } from "@/types/firestore";
import { TextConvert } from "@/utils/TextConvert";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import cuid from "cuid";
import React, { useEffect, useMemo, useState } from "react";

export default function AboutPage() {
  const [about, setAbout] = useState<About[]>([]);
  const { addNotification } = useNotificationsContext();

  useEffect(() => {
    fetch("/api/about/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAbout(data.docs);
        } else {
          addNotification({ id: cuid(), text: GENERIC_ERROR });
        }
      });
  }, [addNotification]);

  const section: { id: string; title: string }[] | undefined = useMemo(() => {
    if (about.length === 0) return;

    return about
      .sort((a, b) => a.createdAt - b.createdAt)
      .map((a) => ({
        id: a.title.split(" ").join("-").toLowerCase(),
        title: a.title,
      }));
  }, [about]);

  return (
    <div className="pt-5 px-4">
      <div className="flex">
        <div className="w-3/4">
          <MouseProvider>
            <Section>
              <div className="flex justify-center">
                <TagLine label="About" />
              </div>
              <div className="flex flex-col gap-3.5">
                {about
                  .sort((a, b) => a.createdAt - b.createdAt)
                  .map((e, i) => (
                    <div
                      id={e.title.split(" ").join("-").toLowerCase()}
                      key={e.docId}
                      className={`flex py-4 px-2.5 flex-col items-start justify-start gap-2 ${
                        i !== 0 ? "border border-t-1-b-active" : ""
                      }`}
                    >
                      <SectionTitle size={8}>{e.title}</SectionTitle>
                      <InViewport>
                        <div
                          className="text-lg animate-hideUpDown "
                          style={{ animationDuration: "0.6s" }}
                        >
                          {TextConvert(e.text).map((t, idx) => (
                            <div
                              className="flex"
                              key={`${e.docId}-context-${t.type}-${idx}`}
                            >
                              {t.type === "bullets" && (
                                <span className="text-white text-2xl self-top">
                                  <Icon icon={"mdi:dot"} />
                                </span>
                              )}
                              <p className={clsx("text-grey-70")}>{t.text}</p>
                            </div>
                          ))}
                        </div>
                      </InViewport>
                    </div>
                  ))}
              </div>
            </Section>
          </MouseProvider>
        </div>
        <aside className="w-1/4 h-full sticky top-15">
          <Section hFull>
            {section && section.length > 0 && (
              <TableOfContents sections={section} />
            )}
          </Section>
        </aside>
      </div>
    </div>
  );
}
