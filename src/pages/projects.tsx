import { Tag, Modal, Card } from "antd";
import {
  GithubOutlined,
  InfoCircleOutlined,
  LockOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useState, type ReactNode, Suspense } from "react";
import type { projects } from "@/types";
import { Separator } from "@/components/ui/separator";

function getYouTubeEmbedURL(url: string): string {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
}

function ProjectModal({
  project,
  open,
  onClose,
}: {
  project: projects;
  open: boolean;
  onClose: () => void;
}): ReactNode {
  const embedURL = project.youtubeLink
    ? getYouTubeEmbedURL(project.youtubeLink)
    : "";

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      width="700px"
    >
      <div className="flex flex-row items-center gap-4 mb-4">
        <img
          src={project.imgURL}
          height={70}
          width={70}
          className="object-contain rounded-md"
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-mono font-bold">{project.projectName}</h2>
          <div className="flex flex-wrap gap-1">
            {project.skills?.map((s, i) => (
              <Tag key={i} color="purple">
                {s}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      <div className="my-4">
        <h3 className="font-mono font-bold text-base mb-2">Code</h3>
        {project.githubLink ? (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-violet-600 hover:underline font-mono text-sm"
          >
            <GithubOutlined />
            View on GitHub
          </a>
        ) : (
          <div className="flex items-start gap-2 text-gray-500 font-mono text-sm">
            <LockOutlined className="mt-0.5 shrink-0" />
            <span>
              {project.codeRestrictionReason
                ? `Code is not publicly available — ${project.codeRestrictionReason}`
                : "Code is not publicly available."}
            </span>
          </div>
        )}
      </div>

      {embedURL && (
        <>
          <Separator />
          <Suspense>
            <div className="my-4">
              <h3 className="font-mono font-bold text-base mb-2">Demo</h3>
              <iframe
                width="100%"
                height="315"
                src={embedURL}
                title={`${project.projectName} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md"
              />
            </div>
          </Suspense>
        </>
      )}

      {project.liveLink && (
        <>
          <Separator />
          <div className="my-4">
            <h3 className="font-mono font-bold text-base mb-2">Live Preview</h3>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <div className="border border-violet-300 rounded-md p-4 flex items-center gap-3 hover:border-violet-600 hover:bg-violet-50 transition-all cursor-pointer">
                <LinkOutlined className="!text-violet-600 text-lg shrink-0" />
                <div className="flex flex-col font-mono overflow-hidden">
                  <span className="text-sm text-violet-600 font-semibold">
                    Visit Project
                  </span>
                  <span className="text-xs text-gray-400 truncate max-w-[500px] ">
                    {project.liveLink}
                  </span>
                </div>
              </div>
            </a>
          </div>
        </>
      )}
    </Modal>
  );
}

function ProjectCard({ project }: { project: projects }): ReactNode {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="w-[250px] h-[400px] flex flex-col justify-between border-1 gap-2 rounded-md relative">
      <div className="flex flex-col items-center basis-3/7 h-4/7 p-2">
        <h1 className="text-md font-mono font-bold text-center mb-2 h-1/4">
          {project.projectName}
        </h1>
        <img
          src={project.imgURL}
          width={150}
          height={150}
          className="object-contain basis-3/4 h-3/4 w-inherit m-2"
        ></img>
      </div>

      <div className="text-xs font-mono text-left overflow-scroll m-2 basis-4/7 h-3/7">
        <Separator />
        <div className="p-2">{project.projectDescription}</div>
      </div>

      <InfoCircleOutlined
        className="absolute bottom-3 right-3 !text-violet-600 cursor-pointer"
        onClick={() => setModalOpen(true)}
      />

      <ProjectModal
        project={project}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export function ProjectsPage({
  projectsData,
  id,
}: {
  projectsData: projects[];
  id: string;
}): ReactNode {
  return (
    <>
      <div className="flex flex-col m-10 ml-5 w-full" id={id}>
        <h1 className="font-mono text-4xl ">{`Projects`}</h1>
        <div className="border-1 w-6/7 border-violet-600" />

        <div className=" md:flex lg:flex flex-row flex-wrap w-6/7 justify-evenly gap-3 my-5 hidden md:block lg:block">
          {projectsData.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
        <div className=" flex flex-col gap-3 w-full lg:hidden md:hidden">
          {projectsData.map((project, idx) => (
            <ProjectCardSmallScreen key={idx} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}

export function ProjectCardSmallScreen({
  project,
}: {
  project: projects;
}): ReactNode {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="h-1/4 w-6/7 my-2 ">
      <Card className="h-full w-full relative">
        <div className="flex flex-row flex-nowrap items-center">
          <div className="[150px] hidden sm:block md:block lg:block">
            <img
              src={project.imgURL}
              height={80}
              width={80}
              className="object-contain"
            ></img>
          </div>
          <div className="px-3 py-0  flex flex-col justify-between h-full w-full">
            <div className="text-l font-mono font-bold flex justify-between w-full">
              <div>{project.projectName}</div>
            </div>
            <Separator />
            <div className="text-m font-mono py-2">
              {`${project.projectDescription}`}
            </div>
          </div>
        </div>
        <InfoCircleOutlined
          className="absolute bottom-3 right-3 !text-violet-600 cursor-pointer"
          onClick={() => setModalOpen(true)}
        />

        <ProjectModal
          project={project}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </Card>
    </div>
  );
}
