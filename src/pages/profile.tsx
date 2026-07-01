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
    <div className="flex lg:flex-col gap-8 md:flex-rowitems-center m-2">
      <div className="lg:basis-1/8 hidden lg:block" />
      <div className="basis-2/8">
        <img
          src={bio?.bioPhotoURL}
          alt={bio?.name}
          className="h-[200px] w-[200px] lg:h-[250px] lg:w-[250px] rounded-full "
        />
      </div>

      <div className="flex flex-col gap-4 basis-6/8 ">
        <div>
          <h1 className="font-mono text-4xl">{"About"}</h1>
          <div className="border-1 w-6/7 border-violet-600" />

          <span className="text-m font-mono" style={{ whiteSpace: "pre-line" }}>
            {bio?.Bio}
          </span>
        </div>

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

export function ProfileSmallScreen({ profileData }: { profileData: profile }) {
  const [bio, setBio] = useState<profile | null>();

  useEffect(() => {
    profileData.then((data) => setBio(data));
  }, [profileData]);

  return (
    <div className="flex flex-col m-10 w-full">
      <h1 className="font-mono text-4xl">{"About"}</h1>
      <div className="border-1 w-6/7 border-violet-600" />

      <div className="flex gap-1 flex-row justify-center items-center w-6/7 gap-2">
        <div className="basis-2/8 ">
          <img
            src={bio?.bioPhotoURL}
            alt={bio?.name}
            className="h-[150px] w-[150px] rounded-full my-2"
          />
        </div>

        <div className="basis-6/8 flex flex-col mx-2">
          <div
            className="text-sm font-mono text-left"
            style={{ whiteSpace: "pre-line" }}
          >
            {bio?.Bio}
          </div>

          <div className="flex flex-row ">
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
    </div>
  );
}
