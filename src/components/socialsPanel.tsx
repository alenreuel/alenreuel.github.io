import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  CopyOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import { useEffect, useState } from "react";
import type { profile } from "@/types";

export function SocialsPanel({
  profileData,
}: {
  profileData: Promise<profile>;
}) {
  const [bio, setBio] = useState<profile | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    profileData.then((data) => setBio(data));
  }, [profileData]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!bio) return null;

  const iconClassName =
    "!text-black text-2xl hover:!text-violet-600 transition-colors cursor-pointer";

  const emailContent = (
    <div className="flex items-center gap-3 font-mono">
      <span>{bio.Email}</span>
      <button
        aria-label="Copy email address"
        className="text-violet-600 hover:text-violet-400 cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(bio.Email).then(() => setCopied(true));
        }}
      >
        {copied ? <CheckOutlined /> : <CopyOutlined />}
      </button>
    </div>
  );

  return (
    <div className="flex justify-end items-start w-full">
      <div className="flex flex-row gap-5 items-center rounded-xl py-4 px-3 mt-1 mr-2 shadow-lg shadow-violet-600/20">
        <Popover
          content={
            <a
              href={bio.Github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <span className="text-violet-600 hover:text-violet-400 transition-colors">
                Visit GitHub
              </span>
            </a>
          }
          placement="left"
          trigger={["hover", "click"]}
        >
          <GithubOutlined className={iconClassName} />
        </Popover>
        <Popover
          content={
            <a
              href={bio.LinkedIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <span className="text-violet-600 hover:text-violet-400 transition-colors">
                Visit LinkedIn
              </span>
            </a>
          }
          placement="left"
          trigger={["hover", "click"]}
        >
          <LinkedinOutlined className={iconClassName} />
        </Popover>

        <Popover
          content={emailContent}
          placement="left"
          trigger={["hover", "click"]}
        >
          <MailOutlined className={iconClassName} aria-label="Email" />
        </Popover>
      </div>
    </div>
  );
}
