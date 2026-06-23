import { Card, Tag } from "antd";
import { GithubOutlined, YoutubeOutlined } from "@ant-design/icons";
import { useEffect, useState, type ReactNode } from "react";
import type { projects } from "@/types";
import { Separator } from "@/components/ui/separator";

function ProjectCard({ project }: { project: projects }): ReactNode {
  return (
    <div className="w-2/7 h-[400px] flex flex-col justify-between border-1 m-1 rounded-md">
      <div className="flex flex-col items-center basis-3/7 h-3/7 p-2">
        <h1 className="text-m font-mono font-bold text-center mb-2 h-1/4">
          {project.projectName}
        </h1>
        <img
          src={project.imgURL}
          width={200}
          height={200}
          className="object-contain basis-3/4 h-3/4 w-inherit m-2"
        ></img>
      </div>

      <div className="text-xs font-mono font-light text-center overflow-scroll m-2 basis-3/7">
        <Separator />
        <div className="p-2">{project.projectDescription}</div>
      </div>

      <div className="flex flex-col gap-3 pt-3 border-t basis-1/7">
        <div className="flex flex-row flex-wrap justify-center gap-1 text-xs">
          {project.skills &&
            project.skills.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <div className="flex flex-row justify-center gap-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-500 transition"
            >
              <GithubOutlined />
            </a>
          )}
          {project.youtubeLink && (
            <a
              href={project.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-red-500 transition"
            >
              <YoutubeOutlined />
            </a>
          )}
        </div>
      </div>
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
        <h1 className="font-mono text-4xl mb-6">{`Projects`}</h1>
        <div className=" flex flex-row flex-wrap w-full items-start ">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
