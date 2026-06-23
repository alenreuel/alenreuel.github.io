import { useState } from "react";
import "./App.css";
import { EducationPage } from "./pages/education";
import type { educationEntry, workExp } from "@/types";
import { WorkExperiencePage } from "./pages/workExperience";

function App() {
  const eduEntry: Promise<educationEntry[]> = fetch(
    "/data/education.json",
  ).then((response) => response.json());
  const workEntry: Promise<workExp[]> = fetch("/data/work.json").then(
    (response) => response.json(),
  );
  return (
    <>
      <EducationPage educationData={eduEntry} />
      <WorkExperiencePage workExperienceData={workEntry} />
    </>
  );
}

export default App;
