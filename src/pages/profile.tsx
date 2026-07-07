import { LinkedinOutlined, GithubOutlined } from "@ant-design/icons";
import { SkillsTab } from "./skills";

import type { profile, skill } from "@/types";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { SocialsPanel } from "@/components/socialsPanel";

export function Profile({ profileData }: { profileData: Promise<profile> }) {
  const [bio, setBio] = useState<profile | null>();

  useEffect(() => {
    profileData.then((data) => setBio(data));
  }, [profileData]);

  return (
    <div className="flex h-full flex-col gap-8 items-center relative">
      <div className="lg:basis-1/8 hidden lg:block" />
      <div className="basis-2/8">
        <img
          src={bio?.bioPhotoURL}
          alt={bio?.name}
          className="h-[200px] w-[200px] lg:h-[250px] lg:w-[250px] rounded-full "
        />
      </div>

      <div className="flex flex-col gap-4 basis-6/8 relative">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-mono text-4xl text-left w-6/7">{"About"}</h1>
          <div className="border-1 w-6/7 border-violet-600 " />

          <div
            className="text-sm font-mono w-6/7 text-left md:text-sm lg:text-m"
            style={{ whiteSpace: "pre-line" }}
          >
            {bio?.Bio}
          </div>
          <SocialsPanel profileData={profileData} />
        </div>
      </div>
    </div>
  );
}

export function ProfileSmallScreen({
  profileData,
  skills,
}: {
  profileData: Promise<profile>;
  skills: Promise<skill[]>;
}) {
  const [bio, setBio] = useState<profile | null>();

  useEffect(() => {
    profileData.then((data) => setBio(data));
  }, [profileData]);

  return (
    <div className="flex flex-col mx-10 my-2 w-full ">
      <h1 className="font-mono text-4xl">{"About"}</h1>
      <div className="border-1 w-6/7 border-violet-600 " />

      <div className="flex gap-1 flex-col sm:flex-row justify-center items-center w-6/7 gap-2">
        <div className="basis-2/8 ">
          <img
            src={bio?.bioPhotoURL}
            alt={bio?.name}
            className="h-[300px] w-[300px] sm:h-[150px] sm:w-[150px] rounded-full my-2"
          />
          <SocialsPanel profileData={profileData} />
        </div>

        <div className="basis-6/8 sm:h-[150px] flex flex-col mx-2 relative">
          <div
            className="text-sm font-mono text-left"
            style={{ whiteSpace: "pre-line" }}
          >
            {bio?.Bio}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="mt-10 w-full md:w-3/7 md:absolute bottom-0 right-0"
              >
                {
                  <span className="text-xl font-mono">
                    <span className="text-violet-600">{"<"}</span>
                    {"Tech Stack"}
                    <span className="text-violet-600">{"/>"}</span>
                  </span>
                }
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-gray-100 !w-2/5">
              <SheetHeader>
                <SheetTitle>
                  {
                    <span className="text-2xl font-mono">
                      <span className="text-violet-600">{"<"}</span>
                      {"Tech Stack"}
                      <span className="text-violet-600">{"/>"}</span>
                    </span>
                  }
                </SheetTitle>
              </SheetHeader>
              <div>
                <SkillsTab data={skills} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
