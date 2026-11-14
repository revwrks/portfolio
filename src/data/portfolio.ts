export interface Project {
  id: string;
  title: string;
  category: "engineering" | "creative";
  tagline: string;
  description: string;
  metrics: string[];
  techStack: string[];
  highlights: string[];
  links: {
    live?: string;
    github?: string;
    demo?: string;
    details?: string;
  };
  featured: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  url: string;
  skills: string[];
  badgeColor: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  skills: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  location?: string;
}

export interface Volunteering {
  organization: string;
  role: string;
  period: string;
  category: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    brandName: "REVWORKS",
    name: "Mahendra Pujo Prianto",
    alias: "Rev",
    avatar: "/rev3.JPG",
    avatarHover: "/rev2.JPG",
    role: "Creative Technologist & Fullstack Engineer",
    headline: "REVWORKS // Digital engineering, high-throughput systems, and cinematic media by Rev.",
    bio: "Fullstack software engineer and creative director operating under the REVWORKS imprint. 5+ years of shipping production fintech webhook ledgers, interactive canvas engines, and commercial video direction.",
    location: "Malang / Batu, East Java, Indonesia",
    email: "mahendrapujo@gmail.com",
    linkedin: "https://www.linkedin.com/in/mahendra-pujo-p/",
    github: "https://github.com/revwrks",
    instagram: "https://www.instagram.com/itzrevv/",
    status: "REVWORKS LAB // Open for engineering & product collaborations",
  },
  skills: {
    backend: ["Node.js", "Java", "PHP / Laravel", "Python", "REST APIs", "Webhooks", "Asynchronous Jobs"],
    databases: ["MySQL", "PostgreSQL", "Database Schema Design", "Query Optimization", "Key-Value Stores"],
    frontend: ["TypeScript", "React", "Next.js", "Tailwind CSS", "HTML5 Canvas", "Web Audio API"],
    creativeDesign: ["Google UX Design", "Figma", "User Journey Mapping", "Video Direction", "Cinematography", "Adobe Premiere Pro"],
    devOpsAndTools: ["Git / GitHub", "Vercel", "Netlify", "Linux / Bash", "XAMPP / Apache"]
  },
  projects: [
    {
      id: "topup-store",
      title: "TopUp Store & KeyVault Engine",
      category: "engineering",
      tagline: "High-concurrency digital inventory, subscription ledger, and webhook processing platform.",
      description: "Enterprise-grade digital gaming and SaaS subscription provisioning platform. Built with dedicated asynchronous webhook ingestion, financial wallet mutation ledgers, and secure automated key distribution.",
      metrics: ["Sub-second webhook response", "Zero-leak automated key vault", "Double-entry wallet mutation ledger"],
      techStack: ["Laravel", "PHP", "Tailwind CSS", "MySQL", "Vite", "Webhooks"],
      highlights: [
        "Architected KeyVault & SubscriptionSlot models ensuring zero-leak digital inventory delivery.",
        "Built resilient webhook logger with idempotency checks to prevent double-crediting.",
        "Implemented real-time wallet mutations tracking every credit debit with transaction proof.",
        "Created self-service warranty claim workflow with automated replacement checks."
      ],
      links: {
        github: "https://github.com/revwrks",
      },
      featured: true,
    },
    {
      id: "digi-art",
      title: "Digi-Art — Digital Learning & Canvas Studio",
      category: "engineering",
      tagline: "Interactive HTML5 canvas illustration studio and real-time gamified educational platform.",
      description: "Full-scale educational web application deployed on Netlify. Features an in-browser touch-friendly digital illustration studio, Web Audio API synthesizer engine, and orientation-adaptive image reference search.",
      metrics: ["0ms external audio latency", "Touch & Stylus friendly", "Production deployed on Netlify"],
      techStack: ["HTML5 Canvas", "Web Audio API", "JavaScript", "Google Images API", "PHP / Netlify"],
      highlights: [
        "Engineered browser-native drawing engine with Simple Pen, Sketch Pencil, and Soft Watercolor brushes.",
        "Integrated Web Audio API to synthesize interactive quiz sound effects with zero external audio assets.",
        "Built Google Images API proxy with adaptive modal preview supporting instant export to canvas layers.",
        "Gamified Kahoot-style quiz engine with streak multipliers and real-time local leaderboards."
      ],
      links: {
        live: "https://digi-art-netlify.netlify.app",
        github: "https://github.com/mahendrapujo",
      },
      featured: true,
    },
    {
      id: "chorus-studio-erp",
      title: "Chorus Studio — Academic Operations & ERP",
      category: "engineering",
      tagline: "Custom operational software for music academies and vocal ensemble management.",
      description: "Comprehensive back-office management system handling curriculum planning, backing track repositories, student progress tracking, and batch document generation.",
      metrics: ["Bulk automated PDF generation", "Audio repertoire management", "Role-based staff & student portals"],
      techStack: ["PHP", "MySQL", "FPDF / Bulk PDF Engine", "JavaScript", "Apache"],
      highlights: [
        "Automated bulk PDF evaluation report generation reducing manual administrative workload by 80%.",
        "Centralized audio repertoire repository with instant backing track streaming for rehearsals.",
        "Built session planning modules with structured musical meeting logs and teacher feedback tracking.",
        "Audit trail activity logging across administrative actions for operational compliance."
      ],
      links: {
        github: "https://github.com/revwrks",
      },
      featured: true,
    },
    {
      id: "tamboer-gadget-pos",
      title: "Tamboer Gadget — Retail POS & Inventory",
      category: "engineering",
      tagline: "Real-world production retail point-of-sale and live hardware stock tracking system.",
      description: "Custom point-of-sale platform developed for retail electronics operations. Handles multi-variant device tracking, service repair logs, and automated daily profit/loss reports.",
      metrics: ["Active daily retail usage", "Multi-role technician & cashier access", "Automated sales summaries"],
      techStack: ["Laravel", "Vite", "Tailwind CSS", "MySQL", "Vercel / Local Server"],
      highlights: [
        "Engineered real-time inventory deduction preventing overselling across retail counters.",
        "Built technician workflow tracker for customer hardware repair and diagnostic status.",
        "Generates automated daily sales recaps, cash-drawer reconciliation, and margin analysis."
      ],
      links: {
        github: "https://github.com/revwrks",
      },
      featured: false,
    },
    {
      id: "chorus-concert-2026",
      title: "Chorus Studio Concert — Lead Direction",
      category: "creative",
      tagline: "Director & Lead Camera Operator for a continuous 2-hour vocal showcase.",
      description: "Cinematic multi-camera pre-recorded production balancing acoustic live performance energy with rigorous studio visual discipline.",
      metrics: ["2-Hour Continuous Showcase", "Multi-Track Visual Capture", "End-to-end Cinematic Editorial"],
      techStack: ["Video Direction", "Cinematography", "Adobe Premiere Pro", "Color Grading"],
      highlights: [
        "Orchestrated stage blocking, lighting cues, and multi-camera sync across complex choral arrangements.",
        "Directed camera operators to capture tight emotional soloist beats while preserving full-ensemble scope.",
        "Delivered final mastered cut with color grading and dynamic audio sync."
      ],
      links: {},
      featured: true,
    },
    {
      id: "krida-dharma-choir",
      title: "Yang Terbaik Bagimu — Choir Music Video",
      category: "creative",
      tagline: "Award-winning choir narrative music video for Paduan Suara Krida Dharma Yuwana.",
      description: "Directed visual coverage and editorial delivery for a competitive choir performance, turning classical repertoire into an emotional cinematic music video.",
      metrics: ["Award-Winning Competitive Choir", "Narrative Visual Pipeline", "Full Solo Video Production"],
      techStack: ["Videography", "Premiere Pro", "Visual Storytelling", "Audio-Visual Editing"],
      highlights: [
        "Translated competitive choir vocal dynamics into narrative visual pacing.",
        "Executed full pipeline from lighting setup, on-set direction, to final audio mastering integration."
      ],
      links: {},
      featured: false,
    }
  ] as Project[],
  certifications: [
    {
      id: "meta-db",
      name: "Meta Database Engineer Professional",
      issuer: "Meta (Coursera)",
      issueDate: "Feb 2024",
      credentialId: "7Z37S6CUNM2C",
      url: "https://www.coursera.org/account/accomplishments/verify/7Z37S6CUNM2C",
      skills: ["Database Engineering", "MySQL", "Relational Modeling", "Optimization"],
      badgeColor: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    },
    {
      id: "google-ux",
      name: "Google UX Design Professional Certificate",
      issuer: "Google (Coursera)",
      issueDate: "Feb 2024",
      credentialId: "8T8EKTVJRKUY",
      url: "https://www.coursera.org/account/accomplishments/verify/8T8EKTVJRKUY",
      skills: ["UX Research", "Figma", "Interaction Design", "Prototyping"],
      badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    },
    {
      id: "ibm-python",
      name: "Python for Data Science, AI & Development",
      issuer: "IBM (Coursera)",
      issueDate: "Feb 2024",
      credentialId: "XACMAJSFZRUF",
      url: "https://www.coursera.org/account/accomplishments/verify/XACMAJSFZRUF",
      skills: ["Python", "Data Processing", "APIs", "Data Structures"],
      badgeColor: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
    },
    {
      id: "hackerrank-node",
      name: "Node.js (Intermediate) Certification",
      issuer: "HackerRank",
      issueDate: "Feb 2024",
      url: "https://www.hackerrank.com/certificates",
      skills: ["Node.js", "Asynchronous I/O", "Event Loop", "Backend APIs"],
      badgeColor: "border-green-500/30 text-green-400 bg-green-500/10",
    },
    {
      id: "hackerrank-sql",
      name: "SQL Certification",
      issuer: "HackerRank",
      issueDate: "Feb 2024",
      url: "https://www.hackerrank.com/certificates",
      skills: ["Complex Queries", "Joins & Subqueries", "Aggregations", "Performance"],
      badgeColor: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    },
    {
      id: "hackerrank-java",
      name: "Java Certification",
      issuer: "HackerRank",
      issueDate: "Feb 2024",
      url: "https://www.hackerrank.com/certificates",
      skills: ["Java OOP", "Collections", "Data Structures", "Memory Management"],
      badgeColor: "border-orange-500/30 text-orange-400 bg-orange-500/10",
    },
    {
      id: "duolingo-english",
      name: "English Proficiency (Professional Working)",
      issuer: "Duolingo English Test",
      issueDate: "Jan 2024 – Jan 2026",
      url: "https://certs.duolingo.com/1a76229b7e3f5141a4a5f5198dac76a1",
      skills: ["Professional English", "Technical Communication", "Global Collaboration"],
      badgeColor: "border-sky-500/30 text-sky-400 bg-sky-500/10",
    }
  ] as Certification[],
  experience: [
    {
      company: "Nusa Indah Tropika",
      role: "Head of Marketing",
      period: "May 2026 – Present",
      location: "Kota Batu, East Java",
      type: "Leadership",
      highlights: [
        "Directing end-to-end commercial growth campaigns and digital branding strategy.",
        "Aligning creative content production pipelines with revenue conversion metrics.",
        "Leading cross-functional visual and marketing distribution teams."
      ],
      skills: ["Marketing Strategy", "Campaign Direction", "Brand Operations", "Cross-team Leadership"]
    },
    {
      company: "Freelance",
      role: "Fullstack Web Developer",
      period: "Aug 2021 – Present (5+ years)",
      location: "Remote / Indonesia",
      type: "Engineering",
      highlights: [
        "Delivered bespoke web applications, e-commerce gateways, and database management solutions for regional clients.",
        "Developed custom backend APIs, webhook integrations, and client-side canvas tools with 99.9% uptime.",
        "Refactored legacy codebases into modern responsive architectures with zero data loss."
      ],
      skills: ["Fullstack Web Development", "PHP / Laravel", "MySQL", "JavaScript / TypeScript", "APIs"]
    },
    {
      company: "Tamboer Gadget",
      role: "Software Technician & Content Creator",
      period: "Oct 2023 – Dec 2024 (1 yr 3 mos)",
      location: "Batu, East Java",
      type: "Hybrid",
      highlights: [
        "Maintained in-house inventory management software and customer POS workflows.",
        "Diagnosed and resolved hardware/firmware software issues across mobile devices.",
        "Spearheaded organic social media video content driving local brand awareness."
      ],
      skills: ["POS Software", "Diagnostics & Repair", "Content Creation", "Social Media Strategy"]
    },
    {
      company: "MGG Software LTD.",
      role: "Software Engineering Intern",
      period: "Jul 2019 – Mar 2020 (9 mos)",
      location: "Indonesia",
      type: "Internship",
      highlights: [
        "Contributed to core enterprise web application modules and bug triage.",
        "Participated in agile code reviews and relational database schema migrations.",
        "Authored internal documentation and test plans for client releases."
      ],
      skills: ["Software Engineering", "Database Migrations", "Agile QA", "Version Control"]
    }
  ] as Experience[],
  education: [
    {
      institution: "Gajayana University",
      degree: "Bachelor of Information Systems / Computer Engineering",
      field: "Information Systems & Computer Engineering",
      period: "2021 – 2025",
      location: "Malang, Indonesia"
    },
    {
      institution: "SMK PGRI 03 Malang",
      degree: "Vocational High School Diploma",
      field: "Computer Engineering & Networking",
      period: "2017 – 2021",
      location: "Malang, Indonesia"
    }
  ] as Education[],
  volunteering: [
    {
      organization: "GKJW (Gereja Kristen Jawi Wetan)",
      role: "Multimedia Specialist",
      period: "Aug 2023 – Present (3+ years)",
      category: "Social Services & Live Broadcast",
      highlights: [
        "Directing live multi-camera broadcast production and audio-visual streaming for weekly congregational services.",
        "Managing media presentation systems, visual cues, and live audio mixing boards.",
        "Mentoring and training youth volunteer teams on live camera operation and media capture."
      ]
    }
  ] as Volunteering[]
};
