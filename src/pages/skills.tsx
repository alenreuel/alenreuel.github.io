import type { skill } from "@/types";
import type { ReactNode } from "react";
import { Splitter } from "antd";
import { useEffect, useState } from "react";

export function SkillsTab({ data }: { data: Promise<skill[]> }): ReactNode {
  const [skillsData, setSkillsData] = useState<skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    data.then((resolvedData) => {
      setSkillsData(resolvedData);
      setLoading(false);
    });
  }, [data]);

  if (loading) return <div className="p-6">Loading skills...</div>;

  const skills: string[] = [
    ...new Set(skillsData.map((val) => val.parent_skill)),
  ];
  const skillsMap: Record<string, skill[]> = Object.fromEntries(
    skills.map((cat) => [
      cat,
      skillsData.filter((val) => cat == val.parent_skill),
    ]),
  );

  return (
    <div className="flex flex-col gap-2 bg-black ">
      {skills.map((category) => (
        <div key={category}>
          <Splitter className="bg-white border-1" />
          <h2 className="text-sm font-bold text-white bg-black font-mono mx-2">
            {category}
          </h2>
          <div className="flex flex-col gap-1 text-white bg-black">
            {skillsMap[category]?.map((skill) => (
              <div key={skill.skill} className="flex items-center gap-1">
                {skill.icon_url && (
                  <img
                    src={skill.icon_url}
                    alt={skill.skill}
                    className="w-6 h-6 flex-shrink-0 object-contain bg-white rounded ml-2"
                  />
                )}
                <p className="text-xs font-mono overflow-hidden ">
                  {skill.skill}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
