export const hero = {
  name: "Travis Dickens",
  role: "Junior Software Engineer",
  tagline: "Building AI and full-stack solutions.",
  location: "South Africa",
  availability: "Open to junior software / AI-ML / backend roles",
};

export const about = {
  title: "Junior Software Engineer building data-driven and real-world solutions",
body: [
  "I’m a junior software engineer with experience across front-end and back-end technologies, designing scalable, data-driven systems and integrating APIs into real-world applications using clean architectural patterns.",
  "I enjoy working in Agile, collaborative environments and solving complex engineering problems, particularly projects that require thoughtful system design, efficient data modeling, and real-world impact while continuously growing as an engineer.",
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
    title: "Fraud Detection and Risk Scoring System",
    description:
      "A real time fraud detection platform that simulates 500-750 financial transactions per minute across South African locations, using ML.NET anomaly detection combined with rule-based risk scoring to flag suspicious activity. Features event-driven data ingestion with Kafka, real-time alerts via SignalR, and an interactive dashboard with risk heatmaps and live alert feeds.",
    tech: ["C#", "ASP.NET Core", "React", "PostgreSQL", "Kafka", "ML.NET", "SignalR", "Docker"],
    github: "https://github.com/TravisDickens/Fraud-Detection-and-Risk-Scoring-System",
    demo: "",
  },

  {
    title: "Real-Time Stock Market Analyzer",
    description:
      "Full-stack dashboard with live candlestick charts, pattern detection, and algorithmic signal generation. Responsive charts with LightweightCharts and Spring Boot REST APIs serving OHLC data with async updates.",
    tech: ["Java", "Spring Boot", "JavaScript", "REST", "LightweightCharts"],
    github: "https://github.com/TravisDickens/Stock-Market-Analyser",
    demo: "",
  },
 {
    title: "Real Time Fleet Monitoring Platform",
    description:
      "A real time fleet monitoring system simulating 500 vehicles across Gauteng with live GPS tracking, WebSocket based telemetry streaming, rule-based alert engine, and interactive dashboard with historical data persistence.",
    tech: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "WebSocket", "Docker"],
    github: "https://github.com/TravisDickens/Real-Time-Fleet-Monitoring",
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
    company: "Forvis Mazars · Innovation and Technology Hub",
    role: "AI/ML Intern",
    period: "Aug 2025 – Present",
    summary:
      "Working within the Innovation and Technology Hub to support audit and business teams through AI/ML models and internal software development.",
    highlights: [
      "Building and studying AI/ML models to support innovation in audit and data-driven business solutions.",
      "Contributed to internal software projects focused on efficiency, automation, and data-driven decision making.",
      "Collaborated with cross-functional teams to integrate AI into existing business processes.",
      "Gained hands-on experience in Software developement, data analytics, and machine learning concepts.",
    ],
  },
];

export const skills = [
  {
    category: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "TypeScript"],
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
    category: "Tools",
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
