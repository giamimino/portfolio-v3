"use client";
import SectionTitle from "@/components/ui/section-title";
import {
  EMPTY_VALUES_ERROR,
  GENERIC_ERROR,
  PROJECT_UPLOAD_SUCCESS,
  TAG_ALREADY_EXIST_ERROR,
} from "@/constants/message.constants";
import { useNotificationsContext } from "@/context/NotificationsContext";
import { Icon } from "@iconify/react";
import cuid from "cuid";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

export const UploadMainComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full justify-center">
      <motion.button
        animate={open ? { x: -100 } : { x: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        onClick={() => setOpen((prev) => !prev)}
        className="w-8 h-8 rounded-lg border border-white z-10 text-white flex justify-center items-center text-lg cursor-pointer"
      >
        <Icon icon={"lucide:upload"} />
      </motion.button>
      {open && <UploadContainer />}
    </div>
  );
};

export const UploadContainer = () => {
  const [tags, setTags] = useState<string[]>([]);
  const newTagRef = useRef<HTMLInputElement>(null);
  const { addNotification } = useNotificationsContext();
  const formRef = useRef<HTMLFormElement>(null);

  const handleAddTag = (value: string) => {
    if (tags.some((t) => t.toLowerCase() === value.toLowerCase())) {
      addNotification({ id: cuid(), text: TAG_ALREADY_EXIST_ERROR });
      return;
    }
    setTags((prev) => [...prev, value]);
  };

  const handleSubmitProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    const thumb = formData.get("thumb") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const project_github_url = formData.get("project_github_url") as string;

    if (
      !type.trim() ||
      !title.trim() ||
      !thumb.trim() ||
      !category.trim() ||
      !description.trim() ||
      !project_github_url.trim()
    ) {
      addNotification({ id: cuid(), text: EMPTY_VALUES_ERROR });

      return;
    }

    const project_values = {
      type,
      title,
      thumb,
      category,
      description,
      project_github_url,
      tags,
    };
    const response = await fetch("/api/project/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_values, tags }),
    });
    const result = await response.json();
    if (result.success) {
      addNotification({ id: cuid(), text: PROJECT_UPLOAD_SUCCESS });
    } else {
      addNotification({ id: cuid(), text: GENERIC_ERROR });
    }
  };

  const inputs = [
    { id: "title", label: "title", type: "input" },
    { id: "category", label: "category", type: "input" },
    { id: "type", label: "type", type: "input" },
    { id: "project_github_url", label: "github url", type: "input" },
    { id: "thumb", label: "thumb url", type: "input" },
    { id: "description", label: "description", type: "textarea" },
  ];

  return (
    <div className="flex flex-col max-w-75">
      <SectionTitle size={4}>Upload Project...</SectionTitle>
      <form ref={formRef} onSubmit={handleSubmitProject}>
        {inputs.map((input, i) => (
          <div
            key={input.id}
            className="relative w-full animate-hideUpDown opacity-0"
            style={{ animationDelay: `${i / 10}s` }}
          >
            <label
              className="px-0.75 z-1 text-white relative text-xs rounded-sm top-2.5 ml-1.5 w-fit font-bold bg-black"
              htmlFor={input.id}
            >
              {input.label}
            </label>
            {input.type === "input" ? (
              <ProjectInput id={input.id} />
            ) : (
              <textarea
                name={input.id}
                className="py-2 px-1.5 flex w-full text-grey-70 bg-black border border-white rounded-sm"
                rows={5}
                id={input.id}
              />
            )}
          </div>
        ))}
      </form>
      <div
        className="flex flex-col gap-2.5 animate-hideUpDown opacity-0"
        style={{ animationDelay: `${(inputs.length + 1) / 10}s` }}
      >
        <div className="flex flex-wrap w-full gap-2.5">
          <h1 className="text-white font-semibold">Tags:</h1>
          {tags.map((t) => (
            <div
              key={t}
              className="text-grey-70 relative 
              flex gap-0.5 animate-hideUpDown opacity-0 select-none"
            >
              <span>{t}</span>
              <button
                className="text-red-500 cursor-pointer 
                transition-all duration-400"
                onClick={() => setTags((prev) => prev.filter((p) => p !== t))}
              >
                <Icon
                  className="text-sm cursor-pointer"
                  icon={"mage:trash-fill"}
                />
              </button>
            </div>
          ))}
        </div>
        <ProjectInput ref={newTagRef} sent={handleAddTag} id="tag-input" />
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
      relative overflow-hidden  mt-2.5 animate-hideUpDown opacity-0"
        style={{
          animationDelay: `${(inputs.length + 2) / 10}s`,
        }}
        onClick={() => {
          if (formRef.current) {
            formRef.current.requestSubmit();
          }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
        <div className="relative z-10 text-white mix-blend-exclusion">
          submit
        </div>
      </button>
    </div>
  );
};

export const ProjectInput = ({
  id,
  sent,
  ref,
}: {
  id: string;
  sent?: (value: string) => void;
  ref?: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <input
      {...(ref ? { ref: ref } : {})}
      name={id}
      className="py-2 px-1.5 flex text-white w-full bg-black border border-white rounded-sm"
      type="text"
      id={id}
      {...(sent
        ? {
            onKeyDown: (e) => {
              if (
                e.key === "Enter" &&
                ref?.current &&
                ref.current.value.trim()
              ) {
                sent(ref.current.value);
                ref.current.value = "";
              }
            },
          }
        : {})}
    />
  );
};

export const AboutUpload = () => {
  const { addNotification } = useNotificationsContext();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const text = formData.get("text") as string;

    if (
      !title.trim() ||
      !text.trim()
    ) {
      addNotification({ id: cuid(), text: EMPTY_VALUES_ERROR });

      return;
    }

    const values = {
      title,
      text,
    };
    const response = await fetch("/api/about/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values }),
    });
    const result = await response.json();
    if (result.success) {
      addNotification({ id: cuid(), text: PROJECT_UPLOAD_SUCCESS });
    } else {
      addNotification({ id: cuid(), text: GENERIC_ERROR });
    }
  };

  const inputs = [
    { id: "title", label: "title", type: "input" },
    { id: "text", label: "text", type: "textarea" },
  ];

  return (
    <div className="flex flex-col max-w-75">
      <SectionTitle size={4}>Upload About...</SectionTitle>
      <form ref={formRef} onSubmit={handleSubmit}>
        {inputs.map((input, i) => (
          <div
            key={input.id}
            className="relative w-full animate-hideUpDown opacity-0"
            style={{ animationDelay: `${i / 10}s` }}
          >
            <label
              className="px-0.75 z-1 text-white relative text-xs rounded-sm top-2.5 ml-1.5 w-fit font-bold bg-black"
              htmlFor={input.id}
            >
              {input.label}
            </label>
            {input.type === "input" ? (
              <ProjectInput id={input.id} />
            ) : (
              <textarea
                name={input.id}
                className="py-2 px-1.5 flex w-full text-grey-70 bg-black border border-white rounded-sm"
                rows={5}
                id={input.id}
              />
            )}
          </div>
        ))}
      </form>
      <button
        className="p-3 rounded-2xl backdrop-blur-lg border 
      border-white/10 from-black/60 
      to-black/40 shadow-lg hover:shadow-2xl 
      hover:shadow-white/20 hover:scale-110 hover:rotate-1 
      active:scale-95 active:rotate-0 transition-all 
      duration-300 ease-out cursor-pointer 
      hover:border-white/30 hover:bg-linear-to-tr 
      hover:from-white/10 hover:to-black/40 group 
      relative overflow-hidden  mt-2.5 animate-hideUpDown opacity-0"
        style={{
          animationDelay: `${(inputs.length + 2) / 10}s`,
        }}
        onClick={() => {
          if (formRef.current) {
            formRef.current.requestSubmit();
          }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
        <div className="relative z-10 text-white mix-blend-exclusion">
          submit
        </div>
      </button>
    </div>
  );
};
