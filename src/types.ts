export type educationEntry = {
  university_name: string;
  qualification: string;
  start: number;
  end: number | string;
  gpa: string;
  imageURL: string;
  awards: string[];
};

export type workExp = {
  organizationName: string;
  start: number;
  end: number | string;
  role: string;
  responsibilites: string;
  jobResponsibilites: string[];
  imageURL: string;
};

export type projects = {
  projectName: string;
  projectDescription: string;
  imgURL: string;
  githubLink: string;
  youtubeLink: string;
  liveLink?: string;
  codeRestrictionReason?: string;
  skills?: string[];
};

export type profile = {
  name: string;
  bioPhotoURL: string;
  LinkedIN: string;
  Github: string;
  Bio: string;
};

export type skill = {
  skill: string;
  parent_skill: string;
  icon_url: string;
};
