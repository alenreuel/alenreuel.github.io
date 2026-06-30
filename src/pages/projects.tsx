import { Card, Tag } from "antd";
import {
  GithubOutlined,
  YoutubeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState, type ReactNode } from "react";
import type { projects } from "@/types";
import { Separator } from "@/components/ui/separator";

function ProjectCard({ project }: { project: projects }): ReactNode {
  return (
    <div className="w-[250px] h-[400px] flex flex-col justify-between border-1 gap-2 rounded-md relative">
      <div className="flex flex-col items-center basis-3/7 h-3/7 p-2">
        <h1 className="text-m font-mono font-bold text-center mb-2 h-1/4">
          {project.projectName}
        </h1>
        <img
          src={project.imgURL}
          width={150}
          height={150}
          className="object-contain basis-3/4 h-3/4 w-inherit m-2"
        ></img>
      </div>

      <div className="text-xs font-mono text-left overflow-scroll m-2 basis-4/7">
        <Separator />
        <div className="p-2">{project.projectDescription}</div>
      </div>
      <InfoCircleOutlined className="absolute bottom-3 right-3 !text-violet-600 cursor-pointer" />
    </div>
  );
}

export function ProjectsPage({
  projectsData,
  id,
}: {
  projectsData: Promise<projects[]>;
  id: string;
}): ReactNode {
  const [projects, setProjects] = useState<projects[]>([]);

  useEffect(() => {
    projectsData.then((data) => setProjects(data));
  }, [projectsData]);

  return (
    <>
      <div className="flex flex-col m-10 w-full" id={id}>
        <h1 className="font-mono text-4xl ">{`Projects`}</h1>
        <div className="border-1 w-6/7 border-violet-600" />

        <div className=" flex flex-row flex-wrap w-6/7 items-start gap-3 my-5">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
