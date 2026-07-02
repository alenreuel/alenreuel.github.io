import { useRef, type RefObject } from "react";
import "./App.css";
import { EducationPage } from "./pages/education";
import type { educationEntry, profile, skill, workExp } from "@/types";
import { WorkExperiencePage } from "./pages/workExperience";
import { ProjectsPage } from "./pages/projects";
import { Profile, ProfileSmallScreen } from "./pages/profile";
import { Anchor, ConfigProvider } from "antd";
import { SkillsTab } from "./pages/skills";
const { Link } = Anchor;

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const eduEntry: Promise<educationEntry[]> = fetch(
    "/data/education.json",
  ).then((response) => response.json());
  const workEntry: Promise<workExp[]> = fetch("/data/work.json").then(
    (response) => response.json(),
  );
  const projectsEntry: Promise<workExp[]> = fetch("/data/projects.json").then(
    (response) => response.json(),
  );
  const bio: Promise<profile> = fetch("/data/bio.json").then((response) =>
    response.json(),
  );
  const skills: Promise<skill[]> = fetch("/data/skills.json").then((response) =>
    response.json(),
  );

  const Skills = () => (
    <div className=" lg:col-span-3 border-1 h-full overflow-hidden ml-3 bg-gray-100 hidden lg:block">
      <SkillsTab data={skills} />
    </div>
  );
  return (
    <div className="h-screen w-full overscroll-x-hidden ">
      <div className="bg-black w-full h-[37px] lg:block hidden">
        {containerRef && (
          <NavigationBar refContainer={containerRef} includeAbout={false} />
        )}
      </div>
      <div className="bg-black w-full h-[32px] block lg:hidden">
        {containerRef && (
          <NavigationBar refContainer={containerRef} includeAbout={true} />
        )}
      </div>

      <div className="flex flex-col lg:grid grid-flow-col grid-cols-13 gap-2 h-19/20 w-full mr-2 md:m-10 sm:m-10 ">
        <div className="col-span-3 border-1 full overflow-hidden hidden lg:block">
          <Profile profileData={bio} />
        </div>
        <div
          className="lg:col-span-8 h-full overflow-x-hidden ml-2"
          ref={containerRef}
        >
          <div className=" lg:hidden sm:block md:block lg:hidden " id="about">
            <ProfileSmallScreen profileData={bio} skills={skills} />
          </div>
          <WorkExperiencePage workExperienceData={workEntry} id="work-exp" />
          <EducationPage educationData={eduEntry} id="education" />
          <ProjectsPage projectsData={projectsEntry} id="projects" />
        </div>
        <Skills />
      </div>
    </div>
  );
}

export default App;

function NavigationBar({
  refContainer,
  includeAbout,
}: {
  refContainer: RefObject<HTMLDivElement | null>;
  includeAbout?: boolean;
}): React.ReactNode {
  const className: string =
    "font-mono text-white lg:text-xl md:text-lg sm:text-sm";

  return (
    <ConfigProvider
      theme={{
        components: {
          Anchor: {
            colorTextActive: "#7C3AED",
            colorPrimary: "#7C3AED",
            colorLinkHover: "#7C3AED",
          },
        },
      }}
    >
      <div className="flex flex-row justify-between p-0">
        <div className="text-white font-mono lg:text-3xl md:text-2xl sm:text-md mx-5  p-0 ">
          {
            <span className="typewriter">
              <span className="text-violet-600">{"<"}</span>
              {"Alen Reuel"}
              <span className="text-violet-600">{"/>"}</span>
            </span>
          }
        </div>
        <div className="mx-10 hidden lg:block md:block sm:block">
          <Anchor
            affix={false}
            direction="horizontal"
            getContainer={() => refContainer.current || window}
          >
            {includeAbout ? (
              <Link
                href="#about"
                title={<span className={className}>About</span>}
              />
            ) : null}
            <Link
              href="#work-exp"
              title={<span className={className}>Work Experience</span>}
            />
            <Link
              href="#education"
              title={<span className={className}>Education</span>}
            />
            <Link
              href="#projects"
              title={<span className={className}>Projects</span>}
            />
          </Anchor>
        </div>
      </div>
    </ConfigProvider>
  );
}
