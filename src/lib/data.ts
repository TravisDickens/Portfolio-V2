export const hero = {
  name: "Travis Dickens",
  role: "Junior Software Developer",
  tagline: "Building AI-assisted, full-stack solutions with reliable backends.",
  location: "South Africa",
  availability: "Open to junior software / AI-ML / backend roles",
};

export const about = {
  title: "AI-leaning full-stack developer with a backend backbone.",
  body: [
    "I’m a junior software developer focused on AI/ML-assisted products, backend services, and clean, maintainable full-stack code.",
    "I enjoy taking an idea from API design through data and UI, collaborating with cross-functional teams to ship reliable, impactful features.",
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
      "Full-stack dashboard with live candlestick charts, pattern detection, and algorithmic signal generation (moving average crossovers). Responsive charts with LightweightCharts and Spring Boot REST APIs serving OHLC data with async updates.",
    tech: ["Java", "Spring Boot", "JavaScript", "REST", "LightweightCharts"],
    github: "https://github.com/TravisDickens/stock-market-analyzer",
    demo: "https://github.com/TravisDickens/stock-market-analyzer",
  },
  {
    title: "NGO Website & Mobile App",
    description:
      "Event management, volunteer applications, and donation flows with secure Zapper payments. Firebase Auth with role-based access, SMTP notifications, and Kotlin mobile client alongside ASP.NET web experience.",
    tech: ["ASP.NET", "C#", "Firebase", "SMTP", "Kotlin", "Zapper API"],
    github: "https://github.com/TravisDickens/ngo-platform",
    demo: "https://github.com/TravisDickens/ngo-platform",
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
    company: "Forvis Mazars · Innovation & Technology Hub",
    role: "AI/ML Learnership (Junior Software Developer)",
    period: "Aug 2025 – Present",
    summary:
      "Building and studying AI/ML models that support audit and business solutions while contributing to internal software projects for efficiency and automation.",
    highlights: [
      "Prototyped and evaluated AI/ML models for data-driven decisioning in audit contexts.",
      "Delivered internal tools that automate workflows and improve cross-team efficiency.",
      "Collaborated across functions to integrate AI tools into business processes using Python and data analytics.",
    ],
  },
];

export const skills = [
  {
    category: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Java", "C# / .NET", "Python", "Spring Boot", "REST APIs", "Node.js", "Express.js"],
  },
  {
    category: "Data & Cloud",
    items: ["MongoDB", "MySQL", "Firebase", "Azure", "Docker"],
  },
  {
    category: "Practices & Tools",
    items: ["Git", "GitHub", "Agile / SDLC", "API Integrations", "Cyber Security basics"],
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
