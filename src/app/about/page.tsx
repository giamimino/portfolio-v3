"use client";
import Section from "@/components/common/section";
import TableOfContents from "@/components/common/TableOfContents";
import GenericLoading from "@/components/generic-loading";
import MouseProvider from "@/components/providers/MouseProvider";
import InViewport from "@/components/ui/InViewPort";
import SectionTitle from "@/components/ui/section-title";
import TagLine from "@/components/ui/tag-line";
import { GENERIC_ERROR } from "@/constants/message.constants";
import { useNotificationsContext } from "@/context/NotificationsContext";
import { TextConvert } from "@/utils/TextConvert";
import { useAboutStore } from "@/zustand/about-store";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import cuid from "cuid";
import React, { useEffect, useMemo, useState } from "react";

export default function AboutPage() {
  const { about, setAbout } = useAboutStore();
  const { addNotification } = useNotificationsContext();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShow(window.innerWidth >= 720);
  }, []);

  useEffect(() => {
    if (about.length !== 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch("/api/about/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAbout(data.docs);
        } else {
          addNotification({ id: cuid(), text: GENERIC_ERROR });
        }
        setLoading(false);
      });
  }, [addNotification, setAbout]);

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
        <div className="w-3/4 max-[721px]:w-full">
          <MouseProvider>
            <Section>
              <div className="flex justify-center">
                <TagLine label="About" />
              </div>
              <div className="flex flex-col gap-3.5">
                {loading ? (
                  <div>
                    <GenericLoading />
                  </div>
                ) : (
                  about
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
                    ))
                )}
              </div>
            </Section>
          </MouseProvider>
        </div>
        {section && section.length > 0 && show && (
          <aside className="w-1/4 h-full sticky top-15">
            <Section hFull>
              <TableOfContents sections={section} />
            </Section>
          </aside>
        )}
      </div>
    </div>
  );
}
