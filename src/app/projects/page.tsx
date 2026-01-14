"use client";
import { FilterWrapper } from "@/components/common/filter-components";
import Section from "@/components/common/section";
import GenericLoading from "@/components/generic-loading";
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
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<
    { filter: string; type: "type" | "category" | "languages" }[]
  >([]);
  const { addNotification } = useNotificationsContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/project/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.docs);
        } else {
          addNotification({ id: cuid(), text: data.message ?? GENERIC_ERROR });
        }
        setLoading(false);
      });
  }, [addNotification]);

  const filteredProjects = useMemo(() => {
    if (filters.length === 0) return projects;

    const typeFilter = filters.find((f) => f.type === "type")?.filter ?? null;
    const categoriesFilter = new Set(
      filters
        .filter((f) => f.type === "category")
        .map((f) => f.filter.toLowerCase())
    );

    const languagesFilter = new Set(
      filters
        .filter((f) => f.type === "languages")
        .map((f) => f.filter.toLowerCase())
    );

    return projects.filter((f) => {
      const normalizedCategory = f.category.replace(" ", "").toLowerCase();
      const normalizedTags = f.tags.map((t) =>
        t.replace(" ", "").toLowerCase()
      );

      if (typeFilter && f.type !== typeFilter) return false;

      if (categoriesFilter.size && !categoriesFilter.has(normalizedCategory))
        return false;

      if (
        languagesFilter.size &&
        !normalizedTags.some((t) => languagesFilter.has(t))
      )
        return false;

      return true;
    });
  }, [filters, projects]);

  const additionalFilters:
    | {
        id: string;
        label: string;
        type: "type" | "category" | "languages";
      }[]
    | undefined = useMemo(() => {
    if (projects.length === 0) return undefined;

    const categories: {
      id: string;
      label: string;
      type: "type" | "category" | "languages";
    }[] = [...new Set(projects.map((p) => p.category))].map((p) => ({
      id: p.replace(" ", "").toLowerCase(),
      label: p,
      type: "category",
    }));

    const languages: {
      id: string;
      label: string;
      type: "type" | "category" | "languages";
    }[] = [...new Set(projects.map((p) => p.tags).flatMap((p) => p))].map(
      (p) => ({
        id: p.replace(" ", "").toLowerCase(),
        label: p,
        type: "languages",
      })
    );

    return [...categories, ...languages];
  }, [projects]);

  return (
    <div className="px-4 pt-5">
      <div className="flex">
        <div className="w-3/4">
          <Section customResponsivePedding="px-12 max-lg:px-10 max-md:px-2 py-18 max-lg:py-12 max-md:py-8 max-sm:py-4 max-xs:py-2">
            <div className="mb-10 w-full flex justify-center">
              <SectionTitle>Projects</SectionTitle>
            </div>
            {loading ? (
              <div>
                <GenericLoading />
              </div>
            ) : (
              <ProjectsConainer>
                {filteredProjects.length !== 0 ? (
                  filteredProjects.map((p, idx) => (
                    <ProjectWrapper
                      {...p}
                      key={p.project_id}
                      category={
                        Categories[p.category.replace(" ", "").toLowerCase()]
                      }
                      delay={idx / 6}
                    />
                  ))
                ) : (
                  <div className="flex flex-col gap-3.5 justify-center items-center">
                    <Image
                      src={"/search_icon.png"}
                      width={64}
                      height={64}
                      alt="search_icon"
                    />
                    <div className="flex flex-col justify-center items-center">
                      <h1 className="text-white text-2xl font-semibold">
                        No Projects Found.
                      </h1>
                      <p className="text-white/60">
                        Try selecting a different category.
                      </p>
                    </div>
                  </div>
                )}
              </ProjectsConainer>
            )}
          </Section>
        </div>
        <aside className={`sticky top-15 w-1/4 h-full`}>
          <Section customResponsivePedding="px-12 max-lg:px-10 max-md:px-2 py-18 max-lg:py-12 max-md:py-8 max-sm:py-4 max-xs:py-2">
            <div>
              <FilterWrapper
                additionalFilters={additionalFilters}
                filter={filters}
                onChange={setFilters}
              />
            </div>
          </Section>
        </aside>
      </div>
    </div>
  );
}
