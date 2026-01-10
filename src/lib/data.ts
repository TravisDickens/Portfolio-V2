export const hero = {
  name: "Travis Dickens",
  role: "Junior Software Developer",
  tagline: "Building AI and full-stack solutions.",
  location: "South Africa",
  availability: "Open to junior software / AI-ML / backend roles",
};

export const about = {
  title: "Junior Software Engineer building data-driven and real-world solutions",
  body: [
    "I’m a junior software Engineer with experience across front-end and back-end technologies, building practical, data-driven solutions and integrating APIs into real-world applications.",
    "I enjoy working in Agile, collaborative environments and tackling complex problems especially projects with real-world impact where I can apply AI and machine learning concepts while continuously growing as an engineer.",
  ],
  stack: [
    "Java",
    "C# / .NET",
    "Python",
    "Spring Boot",
    "REST APIs",
    "React.js",
    "Firebase",
    "MongoDB",
    "MySQL",
    "Azure",
    "Git / GitHub",
  ],
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    title: "Real-Time Stock Market Analyzer",
    description:
      "Full-stack dashboard with live candlestick charts, pattern detection, and algorithmic signal generation. Responsive charts with LightweightCharts and Spring Boot REST APIs serving OHLC data with async updates.",
    tech: ["Java", "Spring Boot", "JavaScript", "REST", "LightweightCharts"],
    github: "https://github.com/TravisDickens/Stock-Market-Analyser",
    demo: "",
  },
  {
    title: "NGO Website & Mobile App",
    description:
      "Event management, volunteer applications, and donation flows with secure Zapper payments. Firebase Auth with role-based access, SMTP notifications, and Kotlin mobile client alongside ASP.NET web experience.",
    tech: ["ASP.NET", "C#", "Firebase", "SMTP", "Kotlin", "Zapper API"],
    github: "",
    demo: "https://www.ilkfoundation.co.za/",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "Forvis Mazars · Innovation and Technology Hub",
    role: "AI/ML Intern",
    period: "Aug 2025 – Present",
    summary:
      "Working within the Innovation and Technology Hub to support audit and business teams through AI/ML models and internal software development.",
    highlights: [
      "Building and studying AI/ML models to support innovation in audit and data-driven business solutions.",
      "Contributed to internal software projects focused on efficiency, automation, and data-driven decision making.",
      "Collaborated with cross-functional teams to integrate AI into existing business processes.",
      "Gained hands-on experience with Python, data analytics, and applied machine learning concepts.",
    ],
  },
];

export const skills = [
  {
    category: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Java", "C# / .NET", "Python", "Spring Boot", "REST APIs", "Node.js", "Express.js"],
  },
  {
    category: "Data and Cloud",
    items: ["MongoDB", "MySQL", "Firebase", "Azure", "Docker", "AWS"],
  },
  {
    category: "Practices & Tools",
    items: ["Git", "GitHub", "CI/CD", "API Integrations", "CircleCI", "SonarQube"],
  },
];

export const contact = {
  email: "Travis.Dickens@outlook.com",
  socials: [
    { label: "GitHub", href: "https://github.com/TravisDickens" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/travis-dickens-010a84250" },
  ],
};

export const blog = {
  headline: "Sharing notes on AI/ML learnings, backend patterns, and full-stack experiments.",
  note: "Writing to document what I’m building next.",
};
