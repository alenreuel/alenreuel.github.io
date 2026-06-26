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
      skillsData
        .filter((val) => cat == val.parent_skill)
        .sort((a, b) => a.skill.localeCompare(b.skill)),
    ]),
  );

  return (
    <div className="flex flex-col gap-2 ">
      {skills.map((category) => (
        <div key={category}>
          <h2 className="text-sm font-bold  font-mono ml-3">
            {category.toUpperCase()}
          </h2>
          <div className="h-[1px] border-1 ml-3 mb-1" />
          <div className="flex flex-row flex-wrap gap-1 mx-3 ">
            {skillsMap[category]?.map((skill) => (
              <div
                key={skill.skill}
                className="flex flex-row items-center gap-1 border-1 rounded "
              >
                {skill.icon_url && (
                  <img
                    src={skill.icon_url}
                    alt={skill.skill}
                    className="size-3 flex-shrink-0 object-contain bg-white rounded ml-1"
                  />
                )}
                <p className="text-xs font-mono overflow-hidden mr-1">
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
