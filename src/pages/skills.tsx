import type { skill } from "@/types";
import type { ReactNode } from "react";
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
    <div className="flex flex-col gap-2 mt-10 select-none">
      {skills.map((category) => (
        <div key={category}>
          <SkillHeader cat={category} />

          <div className="flex flex-row flex-wrap gap-1 mx-3 ">
            {skillsMap[category]?.map((skill) => (
              <SkillTag skillSpec={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillHeader({ cat }: { cat: string }): ReactNode {
  return (
    <>
      <h2 className="text-sm text-violet-600 font-bold font-mono ml-3 mr-2">
        {cat.toUpperCase()}
      </h2>
      <div className="h-[1px] border-1 mx-3 mb-1 border-gray-300" />
    </>
  );
}

function SkillTag({ skillSpec }: { skillSpec: skill }): ReactNode {
  return (
    <div
      key={skillSpec.skill}
      className="flex flex-row items-center gap-1 border-1 rounded border-gray-300 bg-white"
    >
      {skillSpec.icon_url && (
        <img
          src={skillSpec.icon_url}
          alt={skillSpec.skill}
          className="size-3 flex-shrink-0 object-contain bg-white rounded ml-1"
        />
      )}
      <p className="text-xs font-mono overflow-hidden mr-1">
        {skillSpec.skill}
      </p>
    </div>
  );
}
