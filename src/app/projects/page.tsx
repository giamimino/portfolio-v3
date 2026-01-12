"use client";
import Section from "@/components/common/section";
import {
  ProjectsConainer,
  ProjectWrapper,
} from "@/components/templates/project-components";
import SectionTitle from "@/components/ui/section-title";
import { Categories } from "@/constants/category.constants";
import { GENERIC_ERROR } from "@/constants/message.constants";
import { useNotificationsContext } from "@/context/NotificationsContext";
import { Project } from "@/types/firestore";
import cuid from "cuid";
import React, { useEffect, useState } from "react";

const FilterWrapper = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="mt-2">
      <div className="flex gap-2.5 items-center">
        <div
          className={`p-0.5 w-6 h-3.5 ${
            active ? "bg-grey-30" : "bg-grey-20"
          } transition-all duration-500 rounded-full cursor-pointer relative overflow-hidden`}
          onClick={() => setActive((prev) => !prev)}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full inline-block absolute ${
              active
                ? "top-0.5 left-3 bg-white"
                : "top-0.5 left-[2.5px] bg-white/70"
            } transition-all duration-500`}
          ></span>
        </div>
        <button
          className="text-blue-50 font-medium cursor-pointer"
          onClick={() => setActive((prev) => !prev)}
        >
          Client
        </button>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { addNotification } = useNotificationsContext();

  useEffect(() => {
    fetch("/api/project/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.docs);
        } else {
          addNotification({ id: cuid(), text: data.message ?? GENERIC_ERROR });
        }
      });
  }, [addNotification]);

  return (
    <div className="px-4 pt-5">
      <div className="flex">
        <div className="w-3/4">
          <Section customResponsivePedding="px-12 max-lg:px-10 max-md:px-2 py-18 max-lg:py-12 max-md:py-8 max-sm:py-4 max-xs:py-2">
            <div className="mb-10 w-full flex justify-center">
              <SectionTitle>Projects</SectionTitle>
            </div>
            <ProjectsConainer>
              {projects.map((p, idx) => (
                <ProjectWrapper
                  {...p}
                  key={p.project_id}
                  category={
                    Categories[p.category.replace(" ", "").toLowerCase()]
                  }
                  delay={idx / 6}
                />
              ))}
            </ProjectsConainer>
          </Section>
        </div>
        <aside className={`sticky top-15 w-1/4 h-full`}>
          <Section customResponsivePedding="px-12 max-lg:px-10 max-md:px-2 py-18 max-lg:py-12 max-md:py-8 max-sm:py-4 max-xs:py-2">
            <div className="flex justify-start">
              <SectionTitle size={6}>Filter</SectionTitle>
            </div>
            <div>
              <FilterWrapper />
            </div>
          </Section>
        </aside>
      </div>
    </div>
  );
}
