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
  imageURL: string;
};
