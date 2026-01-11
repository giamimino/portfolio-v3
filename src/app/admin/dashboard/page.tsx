"use client";
import React, { useEffect, useState } from "react";
import {
  AboutUpload,
  UploadContainer,
  UploadMainComponent,
} from "./project-upload-components";
import { useNotificationsContext } from "@/context/NotificationsContext";
import cuid from "cuid";
import Section from "@/components/common/section";
import SectionTitle from "@/components/ui/section-title";
import {
  ProjectsConainer,
  ProjectWrapper,
} from "@/components/templates/project-components";
import { Project } from "@/types/firestore";
import { Categories } from "@/constants/category.constants";

export default function page() {
  const [access, setAccess] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const { addNotification } = useNotificationsContext();
  useEffect(() => {
    fetch("/api/admin/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAccess(true);
        } else if (data.error) {
          addNotification({ id: cuid(), text: data.error });
        }
      });
    fetch("/api/project/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.docs);
        }
      });
  }, []);

  if (!access)
    return (
      <div className="text-white text-center text-xl font-medium">
        <p>You are not alowed to be here.</p>
      </div>
    );
  return (
    <div>
      <Section>
        <div className="flex justify-center">
        <SectionTitle>Upload</SectionTitle>
        </div>
        <div className="mt-10 flex gap-2.5">
        <UploadContainer />
        <AboutUpload />
        </div>
      </Section>
      <div className="h-50"></div>
      <Section>
        <SectionTitle>Projects</SectionTitle>
        <div className="mt-10">
          <ProjectsConainer>
            {projects.map((p, idx) => (
              <div className="relative">
                <ProjectWrapper
                  {...p}
                  category={
                    Categories[p.category.split(" ").join("").toLowerCase()]
                  }
                  delay={idx / 6}
                />
                <button className="absolute left-0 top-0 text-red-600 cursor-pointer">Delete</button>
              </div>
            ))}
          </ProjectsConainer>
        </div>
      </Section>
    </div>
  );
}
