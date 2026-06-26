import { LinkedinOutlined, GithubOutlined } from "@ant-design/icons";
import type { profile } from "@/types";
import { useState, useEffect } from "react";
import { Splitter } from "antd";

export function Profile({ profileData }: { profileData: profile }) {
  const [bio, setBio] = useState<profile | null>();

  useEffect(() => {
    profileData.then((data) => setBio(data));
  }, [profileData]);

  return (
    <div className="flex flex-col gap-8 items-center m-2">
      <div className="basis-1/8" />
      <div className="basis-2/8">
        <img
          src={bio?.bioPhotoURL}
          alt={bio?.name}
          className="h-[250px] w-[250px] rounded-full "
        />
      </div>

      <div className="flex flex-col gap-4 basis-4/8 ">
        <p>
          <span className="text-4xl font-mono my-2">{"About"}</span>
          <br />
          <Splitter className="border-1 border-violet-600" />

          <span className="text-m font-mono" style={{ whiteSpace: "pre-line" }}>
            {bio?.Bio}
          </span>
        </p>

        <div className="flex flex-row gap-6 px-5 basis-1/8">
          {bio && (
            <a
              href={bio.LinkedIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-blue-600 transition"
            >
              <LinkedinOutlined />
            </a>
          )}
          {bio && (
            <a
              href={bio.Github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-gray-800 transition"
            >
              <GithubOutlined />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
