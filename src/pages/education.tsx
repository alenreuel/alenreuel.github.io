import { Card } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import type { educationEntry } from "@/types";
import { Separator } from "@/components/ui/separator";

function EducationQualificationCard({
  educationEntry,
}: {
  educationEntry: educationEntry;
}): ReactNode {
  return (
    <div className="h-1/4 w-6/7 my-2 ">
      <Card className="h-full w-full relative">
        <div className="block absolute top-2 -left-3 sm:hidden md:hidden lg:hidden rounded [50px]">
          <img src={educationEntry.imageURL} height={30} width={30}></img>
        </div>
        <div className="flex flex-row items-center ">
          <div className="hidden sm:block md:block lg:block">
            <img src={educationEntry.imageURL} height={80} width={80}></img>
          </div>
          <div className="px-3 py-0  flex flex-col justify-between h-full w-full">
            <div className="text-l font-mono font-bold flex justify-between w-full">
              <div>{educationEntry.university_name}</div>
              <div className="text-m font-mono font-light italic">{`${educationEntry.start} \u2014 ${educationEntry.end}`}</div>
            </div>
            <h1 className="text-m font-mono font-light">
              {`${educationEntry.qualification}`}
            </h1>
            <Separator />
            <div className="flex flex-col py-2">
              <h1 className="text-m font-mono font-light">
                {`GPA: ${educationEntry.gpa}`}
              </h1>

              {educationEntry.awards.length > 0 ? (
                <h1 className="text-m font-mono font-light">
                  <span>{`Awards: `}</span>
                  {educationEntry.awards.map((award, idx) =>
                    idx < educationEntry.awards.length - 1 ? (
                      <span className="text-m font-mono font-light">{`${award}, `}</span>
                    ) : (
                      <span className="text-m font-mono font-light">{`${award}`}</span>
                    ),
                  )}
                </h1>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function EducationPage({
  educationData,
  id,
}: {
  educationData: Promise<educationEntry[]>;
  id: string;
}): ReactNode {
  const [eduData, setEduData] = useState<educationEntry[]>([]);

  useEffect(() => {
    educationData.then((data) => setEduData(data));
  }, [educationData]);

  return (
    <>
      <div className="flex flex-col w-full m-10 ml-5 w-full" id={id}>
        <h1 className="font-mono text-4xl">{`Education`}</h1>
        <div className="border-1 w-6/7 border-violet-600" />
        {eduData.map((value) => (
          <EducationQualificationCard educationEntry={value} />
        ))}
      </div>
    </>
  );
}
