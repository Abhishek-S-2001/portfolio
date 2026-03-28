# Abhishek Shekhawat - Software Engineer Portfolio

Welcome to my personal portfolio and interactive resume builder repository! This project is designed not just to showcase my work, but to serve as a dynamically generated, printable resume tailored for applicant tracking systems (ATS).

**Live Demo:** [abhishek-shekhawat-portfolio.vercel.app](https://abhishek-shekhawat-portfolio.vercel.app)

---

## ✨ Features

- **Modern Portfolio UI**: A clean, responsive, and animated user interface built with Framer Motion and Tailwind CSS.
- **Interactive Resume Builder (`/resume`)**: 
  - Generates an ATS-friendly, A4-formatted PDF.
  - Interactive sidebar to toggle sections (Experience, Projects, Education, etc.).
  - Checkbox selection to pick which projects to include in the generated resume.
  - Live preview syncing with an editable "Technical Skills" section.
- **Data-as-Content Architecture**: All site and resume information is decoupled from the UI. Content is completely driven by centralized TypeScript files located in the `data/` directory.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: [Vercel](https://vercel.com)

---

## 📂 Project Structure

A quick look at the core structure of the repository:

```text
├── app/
│   ├── layout.tsx         # Root layout and global providers
│   ├── page.tsx           # Main portfolio landing page
│   └── resume/            # Interactive Resume Builder route
│       ├── page.tsx       # Resume state management
│       └── components/    # Resume Document & Control Sidebar
├── components/            # Reusable UI components (Navbar, Footer, Hero, etc.)
├── data/                  # 🗄️ Centralized Data Source (Modify content here!)
│   ├── codingProfiles.ts  
│   ├── education.ts
│   ├── experience.ts
│   ├── projects.ts
│   ├── research.ts
│   └── skills.ts
└── sections/              # Landing page sections (Experience, Projects, etc.)
```

---

## 🚀 Getting Started Locally

To run this project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhishek-S-2001/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Customizing the Content

Because of the **Data-as-Content** approach, updating the portfolio or the generated resume requires zero UI code changes. 

Simply navigate to the `data/` folder and update the relevant TypeScript file. For example, to add a new project, edit `data/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    title: "Awesome New Project",
    tech: ["Next.js", "Tailwind", "PostgreSQL"],
    highlights: ["Built x", "Scaled y", "Achieved z"],
    github: "https://github.com/...",
    link: "https://...",
    // ...
  }
];
```
Both the landing page and the `/resume` builder will instantly reflect the new data.

---

## 📄 Generating a PDF Resume

1. Navigate to the `/resume` route.
2. Use the left floating sidebar to customize the content (toggle sections, select specific projects).
3. Click **"Save as PDF"**.
4. Important: In your browser's print dialog, ensure margins are set to **Default** to properly render the A4 styling constraints.

---

## 🔗 Connect With Me

- **LinkedIn**: [linkedin.com/in/abhishek-shekhawat](https://linkedin.com/in/abhishek-shekhawat)
- **GitHub**: [github.com/Abhishek-S-2001](https://github.com/Abhishek-S-2001)
- **LeetCode**: [leetcode.com/u/AbhishekShekhawat/](https://leetcode.com/u/AbhishekShekhawat/)
