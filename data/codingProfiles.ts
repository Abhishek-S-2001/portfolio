// data/codingProfiles.ts

export interface CodingProfile {
  platform: string;
  stat: string;
  label: string;
  url: string;
  icon: string; // simpleicons CDN URL
}

export const codingProfiles: CodingProfile[] = [
  {
    platform: "LeetCode",
    stat: "450+",
    label: "Problems Solved",
    url: "https://leetcode.com/u/AbhishekShekhawat/",
    icon: "https://cdn.simpleicons.org/leetcode/FFA116",
  },
  {
    platform: "Codeforces",
    stat: "130+",
    label: "Problems Solved",
    url: "https://codeforces.com/profile/AbhishekShekhawat",
    icon: "https://cdn.simpleicons.org/codeforces/1F8ACB",
  },
];
