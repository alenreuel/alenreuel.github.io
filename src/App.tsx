import { useState } from "react";
import "./App.css";
import { EducationPage } from "./pages/education";
import type { educationEntry } from "@/types";

function App() {
  const Eduentry: Promise<educationEntry[]> = fetch(
    "/data/education.json",
  ).then((response) => response.json());
  return (
    <>
      <EducationPage educationData={Eduentry}></EducationPage>
    </>
  );
}

export default App;
