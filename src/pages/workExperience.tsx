import { Card } from "antd";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState, type ReactNode } from "react";
import type { workExp } from "@/types";

function WorkExperienceCard({ workExp }: { workExp: workExp }): ReactNode {
  return (
    <div className="h-1/4 w-2/3 my-2 ">
      <Card className="h-full w-full">
        <div className="flex flex-row flex-nowrap items-center">
          <div className="[150px]">
            <img src={workExp.imageURL} height={80} width={80}></img>
          </div>
          <div className="px-3 py-0  flex flex-col justify-between h-full w-full">
            <div className="text-l font-mono font-bold flex justify-between w-full">
              <div>{workExp.organizationName}</div>
              <div className="text-m font-mono font-light italic">{`${workExp.start} — ${workExp.end}`}</div>
            </div>
            <div className="text-m font-mono font-light">{`${workExp.role}`}</div>
            <Separator />
            <div className="text-m font-mono py-2">
              {`${workExp.responsibilites}`}
            </div>
          </div>
        </div>
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
        {workData.map((value) => (
          <WorkExperienceCard workExp={value} />
        ))}
      </div>
    </>
  );
}
