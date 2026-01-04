"use client";
import AboutCard from "@/components/common/about-card";
import Contact from "@/components/common/Contact";
import Section from "@/components/common/section";
import WelcomeGreet from "@/components/hero/hero-welcome";
import { ExpandablePanel, ExpandablePanelContainer } from "@/components/templates/expandable-panel";
import {
  Category,
  ProjectsConainer,
  ProjectWrapper,
} from "@/components/templates/project-components";
import SectionTitle from "@/components/ui/section-title";
import TagLine from "@/components/ui/tag-line";
import { Categories } from "@/constants/category.constants";
import { useNotificationsContext } from "@/context/NotificationsContext";
import { Project } from "@/types/firestore";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>();
  const [selectedCategory, selectCategory] = useState<{
    key: string;
    label: string;
  }>({ key: "allprojects", label: "All Projects" });

  useEffect(() => {
    fetch("/api/project/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.docs);
          console.log(data);
        }
      });
  }, []);

  const filteredProjects = useMemo(() => {
    if (!projects || !selectedCategory) return [];

    if (selectedCategory.key === "allprojects") return projects;

    const result = projects.filter(
      (p) =>
        p.category.split(" ").join("").toLowerCase() ===
        selectedCategory.key.toLowerCase()
    );

    if (result) return result;

    return [];
  }, [projects, selectedCategory]);

  return (
    <div className="flex flex-col px-12 max-md:px-6 max-sm:px-3">
      <section className="pt-20 flex flex-col gap-10 mb-12">
        <WelcomeGreet />
        <div className="opacity-0 animate-hideDown">
          <p className="text-shadow-67 text-xl md:text-2xl text-n-2 text-center">
            A Fullstack Web Developer & ReactNative developer
          </p>
          <p className="text-shadow-67 italic text-lg md:text-xl text-n-3 text-center block">
            "Writing better code than AI"
          </p>
        </div>
        <div className="w-full flex justify-center">
          <Link
            href={
              "https://mail.google.com/mail/?view=cm&fs=1&to=miminoshvili2102@gmail.com&su=Website&body=message%20goes%20here"
            }
            target="_blank"
            className="px-6 py-4 rounded-full backdrop-blur-lg border border-white/10 from-black/60 to-black/40 shadow-lg hover:shadow-2xl hover:shadow-white/20 hover:scale-110 hover:rotate-1 active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer hover:border-t-white/40 hover:border-x-white/35 hover:border-b-white/20 hover:bg-linear-to-tr hover:from-white/10 hover:to-white/1 group relative overflow-hidden  mt-2.5 animate-hideUpDown opacity-0 flex items-center gap-2.5 hover:gap-4"
            style={{
              animationDuration: "0.9s",
              animationDelay: "0.4s",
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
            ></div>
            <div className="relative z-10 text-white mix-blend-exclusion text-lg font-medium">
              Let's connect
            </div>
            <div className="button-arrow-circle group-hover:text-xl">
              <Icon icon={"mingcute:right-fill"} />
            </div>
          </Link>
        </div>
      </section>
      <Section>
        <div className="w-full gap-2.5 flex flex-col justify-center items-center">
          <TagLine label="what do i do" />
          <SectionTitle>I Know How To Make A Good Web Application</SectionTitle>
        </div>
        <div className="w-full flex justify-center gap-2.5 flex-wrap mt-12 max-md:mt-6 max-sm:mt-3">
          <AboutCard
            title="Full-Stack Developer"
            context="I build fast, accessible websites"
            skills={[
              "Modren React/Next.js Frontends",
              "Auth & databases (firebase, prisma, JWT, Next Auth)",
              "Performance, clean code, fast learner",
            ]}
            tags={["React", "Next.js", "Prisma"]}
          />
        </div>
      </Section>
      <Section noIcons={{ tl: true, tr: true }}>
        <div className="w-full gap-2.5 flex flex-col justify-center items-center">
          <TagLine label="my professional journey" />
          <SectionTitle>Professional Work</SectionTitle>
        </div>
        <div className="w-full flex justify-center pt-5">
          <p className="text-white pb-50">
            Not yet, but I hope {`you'll`} be the first.
          </p>
        </div>
      </Section>
      <Section noIcons={{ tl: true, tr: true }}>
        <div className="w-full gap-2.5 flex flex-col justify-center items-center mb-8">
          <TagLine label="my personal work" />
          <SectionTitle>Personal Projects</SectionTitle>
        </div>
        <div className="flex justify-center gap-2.5">
          {Object.entries(Categories).map(([key, value]) => (
            <Category
              key={key}
              {...value}
              active={key === selectedCategory.key}
              onClick={() => selectCategory({ key, label: value.context })}
            />
          ))}
        </div>
        <div className="h-10"></div>
        <ProjectsConainer>
          {filteredProjects.map((p, idx) => (
            <ProjectWrapper
              key={p.project_id}
              {...p}
              category={
                Categories[p.category.split(" ").join("").toLowerCase()]
              }
              delay={idx / 6}
            />
          ))}
        </ProjectsConainer>
        <p className="text-grey-70/60 text-sm text-center mt-8">{`Showing ${filteredProjects.length} projects`}</p>
      </Section>
      <Section>
        <div className="w-full gap-2.5 flex flex-col justify-center items-center">
          <TagLine label="about" />
          <div className="flex flex-col gap-2.5">
            <SectionTitle>Who am I?</SectionTitle>
            <p className="text-grey-70 text-center max-w-125 text-shadow-67">
              I learn fast and work productively, focusing on constant
              improvement rather than wasting time.
            </p>
            {/* <p className="text-grey-70 text-center max-w-125 text-shadow-67">
              I'm someone who enjoys exploring the way things work—from the
              tiniest patterns in nature to the biggest ideas in science and
            </p>
            <p className="text-grey-70 text-center max-w-125 text-shadow-67">
              creativity. Curiosity is a huge part of my identity, and I’m
              always drawn to things that challenge me or open up new ways of
              thinking.

            </p> */}
          </div>
        </div>
        <div className="my-18 flex justify-center">
          <ExpandablePanelContainer>
            <ExpandablePanel title="Title" />
          </ExpandablePanelContainer>
        </div>
        <Contact />
      </Section>
    </div>
  );
}
