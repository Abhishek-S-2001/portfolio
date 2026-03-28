// data/research.ts

export interface Research {
  title: string;
  description: string;
  topics: string[];
  status: string;
  link?: string;
}

export const researchItems: Research[] = [
  {
    title: "Enhancing User Authentication With Single Sign-On and Passkey Integration",
    description: "A study on combining SSO frameworks with passwordless authentication to improve security and user experience in modern applications.",
    topics: ["SSO", "Passkeys", "OIDC", "Zero Trust"],
    status: "Published in IEEE Xplore, 2025",
    link: "https://ieeexplore.ieee.org/document/11211864", 
  },
  {
    title: "Preventing Unattended Session Misuse in SSO Using Continuous Monitoring",
    description: "An adaptive authentication framework that extends Identity Provider (IdP) functions using biometric recognition and continuous behavioral monitoring to secure active sessions.",
    topics: ["Continuous Monitoring", "Zero Trust", "SSO", "Biometrics"],
    status: "Published in IEEE Xplore, 2025",
    link: "https://ieeexplore.ieee.org/document/11430291", 
  },
  {
    title: "Continuous Risk-Adaptive Authentication Framework",
    description: "M.Tech Dissertation designing a continuous monitoring system and dynamic risk function [ R(t) = w₁C + w₂B + w₃S ] to conditionally trigger behavioral surveillance in SSO environments.",
    topics: ["Risk Engine Architecture", "Mathematical Modeling", "Web Application Security", "Machine Learning"],
    status: "M.Tech Dissertation | Active Research",
  },
];
