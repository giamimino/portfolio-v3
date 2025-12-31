"use client";
import AboutCard from "@/components/common/about-card";
import Section from "@/components/common/section";
import WelcomeGreet from "@/components/hero/hero-welcome";
import {
  ProjectsConainer,
  ProjectWrapper,
} from "@/components/templates/project-components";
import SectionTitle from "@/components/ui/section-title";
import TagLine from "@/components/ui/tag-line";
import { useNotificationsContext } from "@/context/NotificationsContext";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
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
            className="landing-button"
          >
            <h1>Let's connect</h1>
            <div className="button-arrow-circle">
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
          <SectionTitle>Client Projects</SectionTitle>
        </div>
        <div className="w-full flex justify-center pt-5">
          <p className="text-white">
            Not yet, but I hope {`you'll`} be the first.
          </p>
        </div>
      </Section>
      <Section noIcons={{ tl: true, tr: true }}>
        <div className="w-full gap-2.5 flex flex-col justify-center items-center">
          <TagLine label="my personal work" />
          <SectionTitle>Personal Projects</SectionTitle>
        </div>
        <div className="h-10"></div>
        <ProjectsConainer>
          <ProjectWrapper
            project_github_url="https://github.com/"
            title="Notes AI"
            tags={["Tailwind", "NextJS", "Prisma", "AI", "Responsive"]}
            thumb="https://www.interviewbit.com/blog/wp-content/uploads/2022/01/Product-Landing-Page-1024x819.png"
            description="Notes AI is a tool, that lets you write notes with the help of AI features, such summarize, repharase, generate title from the your notes, key points generation and much more. Built it using NextJS with the best practies - SSR, Good Security, backend, etc."
            category={{
              icon: "ion:flash-sharp",
              color: "yellow-300",
              context: "full stack",
            }}
          />
        </ProjectsConainer>
      </Section>
    </div>
  );
}
