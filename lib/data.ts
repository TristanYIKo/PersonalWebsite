import type { Tone } from "./tones";

export type Category = "AI & ML" | "Data" | "Web Dev" | "Games";

export interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: Category;
  details: string;
  /** External link rendered inline after `details`. */
  detailsLink?: { text: string; url: string };
  /** Text rendered after `detailsLink`. */
  detailsAfter?: string;
  /** In-site pointer shown under the details (closes the dialog when followed). */
  note?: { text: string; href: string };
  link?: string;
  github?: string;
}

export const categories: readonly Category[] = ["AI & ML", "Data", "Web Dev", "Games"];

export const categoryTone: Record<Category, Tone> = {
  "AI & ML": "violet",
  Data: "amber",
  "Web Dev": "sky",
  Games: "coral",
};

export const projects: Project[] = [
  {
    title: "Code Ranch",
    description:
      "A cowboy-themed typing game where you take down bandits by typing real programming syntax with speed and accuracy.",
    image: "/projects/CodeRanchPic.png",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Lucide React", "Supabase", "PostgreSQL", "ESLint"],
    category: "Web Dev",
    details:
      "Code Ranch drops you into a dusty frontier where every outlaw has a chip on their shoulder and every duel is settled by quick, steady typing. You ride into town with nothing but your keyboard, facing bandits who test your focus, timing, and nerve as you fire off lines of real code in classic high-noon showdowns. Each victory sharpens your aim and builds your legend across the ranch. The world is expanding too. Future updates will bring multiplayer shootouts, ranked leaderboards, character customization, new “wanted posters” with unique challenges, and a growing frontier of towns and bosses. The goal is to turn coding practice into a full adventure where your skills write the story.",
    link: "https://code-ranch.vercel.app/",
  },
  {
    title: "Toronto Housing Price Predictor",
    description:
      "AI-driven housing market forecasting model using macroeconomic data, financial indicators, and machine learning.",
    image: "/projects/TorontoHousingPricePredictor.png",
    tech: ["Python", "pandas", "NumPy", "scikit-learn", "XGBoost", "Supabase (Postgres)"],
    category: "AI & ML",
    details:
      "Built a predictive analytics system that forecasts Toronto housing prices using over 5.782 million rows of historical data from Statistics Canada and the Bank of Canada Valet API. A Python ETL pipeline cleaned, merged, and transformed all datasets into a unified Supabase table. Using this data, I trained seven XGBoost regression models (1–36 month horizons) to analyze long-term market trends. The project includes percent-change forecasts, future price predictions, and structured outputs for visualization. Created November 2025.",
    github: "https://github.com/TristanYIKo/TorontoHousingPricePredictor",
  },
  {
    title: "RoastBot",
    description: "Playful AI resume roaster that turns brutal feedback into friendly, actionable career advice.",
    image: "/projects/RoastBot.png",
    tech: ["Next.js", "React", "CSS", "Framer Motion", "Google Gemini API", "pdf-parse", "Mammoth"],
    category: "AI & ML",
    details:
      "After sending out a bunch of applications with no callbacks, I realized my resume needed honest feedback, but I hated asking friends to tear it apart. RoastBot is my solution: an AI resume roaster that lets you upload your resume and get a mix of funny roasts and concrete suggestions, without any awkwardness. Users upload a PDF, DOCX, or TXT file, which is parsed on the server and fed into a custom Google Gemini prompt. The API returns structured JSON that powers three sections: a comedic “Roast,” a grounded “Reality Check,” and a “Quick Fixes” panel with specific edits. The frontend focuses on a playful, character-driven UI while keeping the UX simple enough for students to drop in a resume and instantly see where they can improve.",
    link: "https://roastbot-three.vercel.app/",
    github: "https://github.com/TristanYIKo/AIResumeRoaster",
  },
  {
    title: "Resonate – Music Rec",
    description: "AI-powered music recommendation app with personalized insights and playlists.",
    image: "/projects/Resonate1.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js", "PostgreSQL", "Spotify Web API", "Recharts"],
    category: "Web Dev",
    details:
      "Developed a music recommendation platform using Spotify OAuth and Supabase for secure user data storage. The website analyzes listening history to deliver tailored suggestions, including general recommendations, playlist-based picks, and artist-specific tracks. A dynamic dashboard visualizes listening habits, highlighting peak activity times, favorite artists, songs, and genres.",
    note: {
      text: "Currently in development mode — to request access, send your full name and email through the Connect page.",
      href: "#connect",
    },
    link: "https://resonate-song-rec.vercel.app/",
    github: "https://github.com/TristanYIKo/Resonate-SongRec",
  },
  {
    title: "Focusly – Study Tracker",
    description: "Desktop productivity app for managing study sessions and visualizing learning progress.",
    image: "/projects/Focusly.png",
    tech: ["Python", "PySide6", "SQL", "pandas", "matplotlib"],
    category: "Data",
    details:
      "Built a multi-mode study tracker featuring ad hoc and Pomodoro timers that record study sessions in an SQL database. The app tracks session duration, study frequency, and overall productivity, while matplotlib visualizes study trends over time. It also includes a built-in to-do list for organizing daily tasks and maintaining focus.",
    github: "https://github.com/TristanYIKo/Focusly-StudyTracker",
  },
  {
    title: "Factor Five",
    description: "Financial analytics platform with industry-based stock analysis and real-time market insights.",
    image: "/projects/FactorFive.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Finnhub API", "NewsAPI"],
    category: "Web Dev",
    details:
      "Built a financial analytics platform that evaluates U.S. and select international stocks through industry benchmarking and competitor comparisons. The system analyzes valuation trends, analyst data, and historical performance to generate in-depth company insights. It also includes a live news section that aggregates major and minor market catalysts for real-time awareness.",
    link: "https://factor-five.vercel.app/",
    github: "https://github.com/TristanYIKo/FactorFive",
  },
  {
    title: "Excel Calendar",
    description: "Automated calendar system with dynamic event management and scheduling features.",
    image: "/projects/ExcelCalendar.png",
    tech: ["Excel", "VBA"],
    category: "Data",
    details:
      "Built an interactive Excel-based calendar system using VBA macros for automated date calculations, event scheduling, and recurring task management. Features include color-coded events, monthly/yearly views, and custom reminder system.",
    github: "https://github.com/TristanYIKo/ExcelCalendar",
  },
  {
    title: "Excel Financial Tracker",
    description: "Personal finance management tool with budgeting, expense tracking, and forecasting.",
    image: "/projects/ExcelFinancialTracker.png",
    tech: ["Excel", "VBA"],
    category: "Data",
    details:
      "Developed a comprehensive financial tracking spreadsheet with automated expense categorization, budget monitoring, and trend analysis. Includes custom VBA functions for transaction importing, data validation, and generating monthly financial reports.",
    github: "https://github.com/TristanYIKo/FinancialPlanner-Excel",
  },
  {
    title: "Shroud – Python Game",
    description: "Top-down 2D RPG featuring combat, exploration, and progression systems.",
    image: "/projects/Shroud.png",
    tech: ["Python", "Pygame"],
    category: "Games",
    details: "Developed a story-driven RPG using Pygame with visual assets from ",
    detailsLink: { text: "Cute Fantasy RPG", url: "https://kenmi-art.itch.io/cute-fantasy-rpg" },
    detailsAfter:
      ". Players explore open areas, battle monsters, and progress toward defeating the Shroud, an evil legion that has taken over the lands. The game features HP, stamina, and experience systems, smooth combat mechanics, sprite animations, and map transitions. Currently in active development with plans for new areas, abilities, and storyline expansion.",
    github: "https://github.com/TristanYIKo/DungeonCrawlerGamePython",
  },
  {
    title: "Imposter Game",
    description: "Interactive multiplayer game built for fast, in-person group play.",
    image: "/projects/imposterGame.png",
    tech: ["React", "Next.js", "CSS", "TypeScript", "Framer Motion"],
    category: "Games",
    details:
      "Developed a mobile-friendly pass & play Imposter game that allows players to enter names, dynamically assign roles, and reveal them one at a time in a controlled flow. Built a responsive UI with custom sliders for player and imposter count, interactive category selection, and a spinning wheel to determine who speaks first. Implemented smooth transitions, clean state handling, and a visual result screen to enhance the in-person gameplay experience.",
    link: "https://imposter-game-omega.vercel.app/",
    github: "https://github.com/TristanYIKo/ImposterGame",
  },
  {
    title: "Orbit – Retro 2D Game",
    description: "Space-themed infinite runner with custom pixel art and original audio.",
    image: "/projects/Orbit.png",
    tech: ["Java", "AWT", "Swing", "Graphics2D", "ImageIO", "Custom Pixel Art"],
    category: "Games",
    details:
      "Developed a 2D infinite runner using Java with fully custom pixel art and sound design. Players navigate through space, avoiding planets while collecting coins that can be spent on special skins in the in-game shop. The game features collision detection, enemy and obstacle generation, progressive difficulty scaling, and a smooth retro arcade aesthetic.",
    github: "https://github.com/TristanYIKo/Orbit-2DRunner",
  },
];

export interface Experience {
  /** Anchor id, so the index beside the section title can scroll to it. */
  id: string;
  role: string;
  company: string;
  /** Short company name for the index. */
  indexLabel: string;
  period: string;
  location: string;
  /** Marks the role you are in right now. */
  current?: boolean;
  description?: string;
  achievements: string[];
  tone: Tone;
}

/** Newest first. Written for the site; it deliberately differs from the resume's wording. */
export const experiences: Experience[] = [
  {
    id: "allstate",
    role: "Provincial Product Analyst",
    company: "Allstate Insurance Company of Canada",
    indexLabel: "Allstate",
    period: "Sep 2026 – Dec 2026",
    location: "Markham, ON (Remote)",
    current: true,
    description:
      "Focused on optimizing risk-selection strategies and automating recurring performance reporting for the Ontario market.",
    achievements: [
      "Analyzed historical claims data to spot underperforming customer segments, helping senior leaders shape a safer, more profitable pricing strategy for Ontario.",
      "Automated 12+ recurring performance reports using Python, cutting monthly report preparation time by 85%.",
      "Modernized team reporting by transitioning workflows and Power BI dashboards from legacy software to Microsoft Fabric for automatic data updates.",
    ],
    tone: "sky",
  },
  {
    id: "mto",
    role: "Junior Technical Analyst",
    company: "Ontario Ministry of Transportation",
    indexLabel: "Ministry of Transportation",
    period: "Jan 2026 – Apr 2026",
    location: "Toronto, ON",
    description:
      "Handled software troubleshooting across internal web applications and built centralized databases to streamline internal tracking.",
    achievements: [
      "Resolved complex data-flow and communication issues between the website frontend, backend server, and database to keep internal applications running smoothly.",
      "Wrote precise database migration scripts to securely update large sets of records without data loss or system errors.",
      "Built a centralized database system to track employee work arrangements, replacing scattered spreadsheets with a single, organized platform.",
    ],
    tone: "mint",
  },
  {
    id: "iovate",
    role: "Supply Chain Intern",
    company: "Iovate Health Sciences International Inc.",
    indexLabel: "Iovate",
    period: "May 2025 – Aug 2025",
    location: "Oakville, ON",
    description:
      "Streamlined supply chain operations by building automated inventory tools, data pipelines, and performance dashboards.",
    achievements: [
      "Created an automated Excel inventory tool for over 800 products to calculate exact reorder quantities and schedules, cutting manual planning time by over 90%.",
      "Built Python scripts to automatically upload and sync supply chain data, completely eliminating manual entry mistakes.",
      "Designed clear Power BI dashboards for team-wide metrics and analyzed warehouse shipping errors to reduce fulfillment mistakes by 35%.",
    ],
    tone: "amber",
  },
];

export const socialLinks = [
  {
    name: "LinkedIn",
    handle: "tristan-ko",
    href: "https://www.linkedin.com/in/tristan-ko/",
    label: "Connect on LinkedIn",
    tone: "sky",
  },
  {
    name: "GitHub",
    handle: "TristanYIKo",
    href: "https://github.com/TristanYIKo",
    label: "View GitHub profile",
    tone: "amber",
  },
  {
    name: "Instagram",
    handle: "@tristan__ko",
    href: "https://www.instagram.com/tristan__ko/",
    label: "Follow on Instagram",
    tone: "coral",
  },
  {
    name: "Email",
    handle: "tristanko1116@gmail.com",
    href: "mailto:tristanko1116@gmail.com",
    label: "Send an email",
    tone: "mint",
  },
] as const satisfies readonly {
  name: string;
  handle: string;
  href: string;
  label: string;
  tone: Tone;
}[];
