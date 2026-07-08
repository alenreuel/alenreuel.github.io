import { Card, Modal } from "antd";
import { InfoCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState, type ReactNode } from "react";
import type { workExp } from "@/types";

function WorkExperienceCard({ workExp }: { workExp: workExp }): ReactNode {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="h-1/4 w-6/7 my-2 ">
      <Card className="h-full w-full relative">
        <div className="block absolute top-2 -left-3 sm:hidden md:hidden lg:hidden rounded [50px]">
          <img src={workExp.imageURL} height={30} width={30}></img>
        </div>
        <div className="flex flex-row flex-nowrap items-center">
          <div className="hidden sm:block md:block lg:block">
            <img src={workExp.imageURL} height={80} width={80}></img>
          </div>
          <div className="px-3 py-0  flex flex-col justify-between h-full w-full">
            <div className="text-s sm:text-l md:text-l lg:text-l font-mono font-bold flex justify-between w-full">
              <div>{workExp.organizationName}</div>
              <div className="text-xs sm:text-m md:text-m lg:text-m font-mono font-light italic flex-none">{`${workExp.start} — ${workExp.end}`}</div>
            </div>
            <div className="text-xs sm:text-m md:text-m lg:text-m font-mono font-light">{`${workExp.role}`}</div>
            <Separator />
            <div className="text-xs sm:text-m md:text-m lg:text-m font-mono py-2">
              {`${workExp.responsibilites}`}
            </div>
          </div>
        </div>
        <InfoCircleOutlined
          className="absolute bottom-3 right-3 !text-violet-600 cursor-pointer"
          onClick={() => setModalOpen(true)}
        />

        <Modal
          title={null}
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          width={"700px"}
        >
          <div className="flex flex-row flex-nowrap items-center">
            <div className="[150px]">
              <img src={workExp.imageURL} height={80} width={80}></img>
            </div>
            <div className="px-0 sm:px-3 md:px-3 lg:px-3 py-0  flex flex-col justify-between  h-full w-full">
              <div className="text-l font-mono font-bold flex justify-between w-full">
                <div>{workExp.organizationName}</div>
                <div className="text-m font-mono font-light italic flex-none">{`${workExp.start} — ${workExp.end}`}</div>
              </div>
              <div className="text-m font-mono font-light">{`${workExp.role}`}</div>
              <Separator />
            </div>
          </div>
          <h2 className="text-xl font-mono font-bold p-2">{"Experience"}</h2>
          <div className="text-m font-mono py-2 flex flex-col gap-1">
            {workExp.jobResponsibilites.map((val, index) => (
              <>
                <div className="flex flex-row gap-1 justify-center">
                  <RightOutlined className="!text-violet-600  text-xl" />
                  <li key={index}>{val}</li>
                </div>
                <Separator />
              </>
            ))}
          </div>
        </Modal>
      </Card>
    </div>
  );
}

export function WorkExperiencePage({
  workExperienceData,
  id,
}: {
  workExperienceData: Promise<workExp[]>;
  id: string;
}): ReactNode {
  const [workData, setWorkData] = useState<workExp[]>([]);

  useEffect(() => {
    workExperienceData.then((data) => setWorkData(data));
  }, [workExperienceData]);

  return (
    <>
      <div className="flex flex-col m-10 w-full" id={id}>
        <h1 className="font-mono text-4xl">{`Work Experience`}</h1>
        <div className="border-1 w-6/7 border-violet-600" />

        {workData.map((value) => (
          <WorkExperienceCard workExp={value} />
        ))}
      </div>
    </>
  );
}
