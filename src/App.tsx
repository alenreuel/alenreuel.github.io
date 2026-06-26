import { useRef, type RefObject } from "react";
import "./App.css";
import { EducationPage } from "./pages/education";
import type { educationEntry, profile, skill, workExp } from "@/types";
import { WorkExperiencePage } from "./pages/workExperience";
import { ProjectsPage } from "./pages/projects";
import { Profile } from "./pages/profile";
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
  return (
    <>
      <div className="h-screen w-full ">
        <div className="bg-black w-full h-1/20 ">
          {containerRef && <NavigationBar refContainer={containerRef} />}
        </div>
        <div className="grid grid-flow-col grid-cols-13 gap-2 h-19/20 w-full ">
          <div className="col-span-3 border-1 h-full overflow-hidden">
            <Profile profileData={bio} />
          </div>
          <div
            className="col-span-8 h-full overflow-x-hidden ml-10"
            ref={containerRef}
          >
            <WorkExperiencePage workExperienceData={workEntry} id="work-exp" />
            <EducationPage educationData={eduEntry} id="education" />
            <ProjectsPage projectsData={projectsEntry} id="projects" />
          </div>
          <div className="col-span-2 border-1 h-full overflow-hidden ">
            <SkillsTab data={skills} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

function NavigationBar({
  refContainer,
}: {
  refContainer: RefObject<HTMLDivElement | null>;
}): React.ReactNode {
  const className: string = "font-mono text-white text-xl";
  return (
    <ConfigProvider
      theme={{
        components: {
          Anchor: {
            colorTextActive: "#fffffff0",
            colorPrimary: "#fffffff0",
            colorLinkHover: "#fffffff0",
          },
        },
      }}
    >
      <div className="flex flex-row justify-between p-0">
        <div className="text-white font-mono text-3xl mx-10 p-0 ">
          {<span className="typewriter">{"<Alen Reuel/>"}</span>}
        </div>
        <div className="mx-10 ">
          <Anchor
            affix={false}
            direction="horizontal"
            getContainer={() => refContainer.current || window}
          >
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
