export const hero = {
  name: "Travis Dickens",
  role: "Junior Software Developer",
  tagline:
    "Building systems that are reliable, performant, and built to last. Backend services, REST APIs, full-stack applications, and data-driven software, with a growing focus on putting AI and machine learning into production.",
  location: "South Africa",
  currentRole: {
    company: "Forvis Mazars",
    title: "Junior Developer",
    period: "Aug 2026 - Present",
  },
};

export const about = {
  title: "About",
  body: [
    "Software developer focused on building systems that are reliable, performant, and built to last. I have experience designing backend services, RESTful APIs, full-stack applications, and data-driven systems, with a growing focus on integrating AI and machine learning into practical software.",
    "I take ownership of technical decisions, think carefully about system design and architecture, and gravitate toward problems where accuracy and real-world impact actually matter.",
  ],
  facts: [
    { label: "Based in", value: "South Africa" },
    { label: "Education", value: "Bachelor of Computer and Information Sciences in Application Development." },
    { label: "Currently", value: "Junior Developer at Forvis Mazars" },
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
    title: "Fraud Detection and Risk Scoring System",
    description:
      "A full-stack real-time fraud detection platform simulating 500–750 transactions per minute across South African locations. Scores transactions using ML.NET anomaly detection combined with rule-based checks, streaming live scored transactions and alerts to a dashboard via SignalR WebSockets. Dashboard features interactive risk heatmaps, KPI cards, live alert feeds, and filterable transaction tables.",
    tech: ["C#", ".NET", "React", "PostgreSQL", "Kafka", "ML.NET", "Docker"],
    github: "https://github.com/TravisDickens/Fraud-Detection-and-Risk-Scoring-System",
    demo: "",
  },
  {
    title: "Real-Time Fleet Monitoring Platform",
    description:
      "A full-stack real-time fleet monitoring dashboard that visualizes live vehicle movement and operational metrics across Gauteng. Simulates 500 vehicles streaming GPS, speed, fuel, and engine temperature data every second via WebSockets. Includes rule-based alerts with severity tiers and cooldown logic to prevent alert flooding.",
    tech: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker"],
    github: "https://github.com/TravisDickens/Real-Time-Fleet-Monitoring",
    demo: "",
  },
  {
    title: "Real-Time Stock Market Analyzer",
    description:
      "A full-stack dashboard that displays real-time candlestick charts and performs technical analysis on market data. Features pattern detection (Doji, Engulfing, Hammers, Morning/Evening Stars) and an algorithmic signal generator using moving average crossovers. Includes a watchlist system with search, dynamic chart rendering across multiple timeframes, and responsive chart UI powered by LightweightCharts.",
    tech: ["Java", "Spring Boot", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/TravisDickens/Stock-Market-Analyser",
    demo: "",
  },
  {
    title: "ILK Foundation — NGO Website & Mobile App",
    description:
      "Event management, volunteer applications, and donation flows with secure Zapper payments. Firebase Auth with role-based access, SMTP notifications, and a Kotlin mobile client alongside an ASP.NET web experience.",
    tech: ["ASP.NET", "C#", "Firebase", "Kotlin", "Zapper API"],
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

export type Education = {
  institution: string;
  qualification: string;
  period: string;
  badge?: string;
};

export const education: Education[] = [
  {
    institution: "IIE Varsity College",
    qualification: "Bachelor of Computer and Information Sciences in Application Development",
    period: "2022 – 2024",
    badge: "Graduated with distinction",
  },
  {
    institution: "Marburg Secondary School",
    qualification: "National Senior Certificate",
    period: "2017 – 2021",
  },
];

export const experience: Experience[] = [
  {
    company: "Forvis Mazars",
    role: "Junior Developer",
    period: "Aug 2026 – Present",
    summary:
      "Designing and developing software applications to solve business problems across multiple departments.",
    highlights: [
      "Owned full delivery lifecycle across multiple projects from stakeholder requirements and system design through to development, operating with minimal oversight.",
      "Architected and built RESTful APIs and event-driven data pipelines to ingest and process high-volume financial data.",
      "Designed and optimised relational database schemas in MSSQL, implementing indexing strategies that reduced query latency on large financial datasets.",
      "Made independent architectural decisions, selecting appropriate patterns and tooling with limited senior oversight in a fast-paced innovation environment.",
      "Collaborated with non-technical stakeholders to translate business needs into practical technical solutions.",
    ],
  },
  {
    company: "Forvis Mazars",
    role: "AI/ML Learnership",
    period: "Aug 2025 – Jul 2026",
    summary:
      "Completed a 12-month learnership laying the technical foundation for a subsequent role as Junior Developer.",
    highlights: [],
  },
];

export const skills = [
  {
    category: "Front-End",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "TypeScript"],
  },
  {
    category: "Back-End",
    items: ["Java", "C#", "Python", "Node.js", ".NET", "Spring Boot"],
  },
  {
    category: "Databases",
    items: ["MSSQL", "PostgreSQL", "NoSQL"],
  },
  {
    category: "Tools and Frameworks",
    items: ["Docker", "Redis", "Azure", "Kafka"],
  },
  {
    category: "Version Control",
    items: ["Git", "GitHub"],
  },
];

export const contact = {
  email: "Travis.Dickens@outlook.com",
  socials: [
    { label: "Email", href: "mailto:Travis.Dickens@outlook.com" },
    { label: "GitHub", href: "https://github.com/TravisDickens" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/travis-dickens-010a84250" },
  ],
};
