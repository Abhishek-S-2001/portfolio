// src/data/education.ts

export interface Education {
  degree: string;
  institution: string;
  location: string;
  date: string;
  details: string;
}

export const educationList: Education[] = [
  {
    degree: "M.Tech Computer Science & Engineering",
    institution: "Amity School of Engineering and Technology",
    location: "Noida",
    date: "2024 - 2026",
    details: "Currently pursuing Master of Technology",
  },
  {
    degree: "B.Tech Information Technology",
    institution: "Amity School of Engineering and Technology",
    location: "Noida",
    date: "2019 - 2023",
    details: "With Minor Degree in Cloud Computing",
  },
  {
    degree: "Class XII (PCM)",
    institution: "Modern Public School, Sec 11",
    location: "Noida",
    date: "2019", 
    details: "CBSE Board",
  },
];