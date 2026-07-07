import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  CopyOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Avatar, Popover } from "antd";
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

  const avatarClassName =
    "!bg-black hover:!bg-violet-600 transition-colors cursor-pointer ring-2 ring-white";

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
    <div className="absolute top-1/2 -translate-y-1/2 -right-3 z-10">
      <div className="flex flex-col gap-2 items-center">
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
          placement="right"
          trigger={["hover", "click"]}
        >
          <Avatar
            size={36}
            icon={<GithubOutlined />}
            className={avatarClassName}
            aria-label="GitHub"
          />
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
          placement="right"
          trigger={["hover", "click"]}
        >
          <Avatar
            size={36}
            icon={<LinkedinOutlined />}
            className={avatarClassName}
            aria-label="LinkedIn"
          />
        </Popover>

        <Popover
          content={emailContent}
          placement="right"
          trigger={["hover", "click"]}
        >
          <Avatar
            size={36}
            icon={<MailOutlined />}
            className={avatarClassName}
            aria-label="Email"
          />
        </Popover>
      </div>
    </div>
  );
}
