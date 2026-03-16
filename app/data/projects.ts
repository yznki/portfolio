export type ProjectType = "fullstack" | "uiux" | "mobile";
export type ProjectStatus = "live" | "design_complete" | "wip";

export interface FigmaLink {
  label: string;
  url: string;
}

export interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: ProjectType;
  status: ProjectStatus;
  year: string;
  liveUrl: string | null;
  githubUrls: string[];
  figmaUrl: string | null;
  description: string;
  longDescription: string;
  tags: string[];
  highlights: string[];
  caseStudy: {
    problem: string;
    solution: string;
    outcome: string;
  };
  // Extended case study fields
  narrative?: string;
  brandDescription?: string;
  wireframesNote?: string;
  figmaUrls?: FigmaLink[];
  mockupImages?: string[];
  codeSnippet?: CodeSnippet;
}

export const projects: Project[] = [
  {
    id: "optionqaaf",
    title: "OptionQaaf",
    subtitle: "Custom Shopify Mobile App",
    type: "mobile",
    status: "live",
    year: "2025",
    liveUrl: null,
    githubUrls: [],
    figmaUrl: null,
    description:
      "A custom-built, design-forward React Native app for a fashion brand — deeply integrated with Shopify. CMS-driven home, product browsing with variants, cart & checkout, wishlists, customer accounts, push notifications, and native maps.",
    longDescription:
      "OptionQaaf Mobile is a production-grade Expo/React Native app built headless on Shopify's Storefront API. The entire home page is CMS-driven via Shopify Metaobjects — the marketing team rearranges banners, product rails, editorial sections, and promos without touching code. The app uses GraphQL Codegen for fully typed Shopify API queries, React Query for caching, Zustand for global state, and MMKV for fast persistent storage. Auth is handled via Shopify Customer Account API with OAuth2/PKCE.",
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Shopify",
      "GraphQL",
      "NativeWind",
      "Zustand",
      "React Query",
      "EAS Build",
      "iOS & Android",
    ],
    highlights: [
      "CMS-driven home page via Shopify Metaobjects — zero code deploys for marketing",
      "Fully typed GraphQL layer auto-generated from Shopify Storefront API schema",
      "OAuth2/PKCE customer authentication via Shopify Customer Account API",
      "Push notifications with Expo Notifications + custom Cloudflare Worker",
      "Native Google Maps SDK integration for store locator",
      "MMKV-backed persistent storage for cart, wishlist, and preferences",
      "Reanimated + Carousel for smooth, 60fps native animations",
      "EAS Build pipeline for App Store and Play Store deployment",
    ],
    caseStudy: {
      problem:
        "OptionQaaf's Shopify storefront was browser-only. The brand needed a native mobile presence with the flexibility to run campaigns and update the home page without developer involvement.",
      solution:
        "Built a fully native React Native app with headless Shopify integration. Architected the home page around Shopify Metaobjects so that layout, content, and ordering are fully controlled by the marketing team through the Shopify admin dashboard.",
      outcome:
        "Production-ready iOS and Android app with a modular CMS-driven home, complete shopping flow from browse to checkout, customer accounts, wishlists, and push notifications — built solo as contractor for the OptionQaaf team.",
    },
    narrative:
      "OptionQaaf is a fashion brand that needed to go native. Their Shopify store was browser-only, and customers were bouncing. The brief was clear: build a mobile app that feels as premium as the brand, gives marketing full control of the home page without code deploys, and ships to both App Store and Play Store.",
    brandDescription:
      "The OptionQaaf brand is anchored by its Arabic calligraphy mark — a bold, fashion-forward 'ق' (Qaaf) that bridges Arabic heritage with contemporary streetwear. The palette is stark: near-black, white, and a maroon brand accent. Typography is Geist throughout — clean and utilitarian, letting the product photography do the talking.",
    figmaUrls: [
      {
        label: "UI Design",
        url: "https://www.figma.com/design/IwWWfUMkjWdeFFufUcGhVa/OptionQaaf-Mobile",
      },
      {
        label: "App Mockups",
        url: "https://www.figma.com/design/j0A5HyTk0Vm9hD7evo9M7e/Mockups",
      },
    ],
    mockupImages: [
      "/project-media/optionqaaf/mockup-1.png",
      "/project-media/optionqaaf/mockup-2.png",
      "/project-media/optionqaaf/mockup-3.png",
      "/project-media/optionqaaf/mockup-4.png",
      "/project-media/optionqaaf/mockup-5.png",
      "/project-media/optionqaaf/mockup-6.png",
      "/project-media/optionqaaf/mockup-7.png",
      "/project-media/optionqaaf/mockup-8.png",
    ],
    codeSnippet: {
      filename: "ui/home/sections/registry.ts",
      language: "typescript",
      description:
        "The entire home page is CMS-driven via Shopify Metaobjects. This registry maps content block types to React Native components — meaning marketing controls layout without code deploys.",
      code: `// Every home section is registered here.
// Marketing adds/reorders sections in Shopify Admin.
// Zero code deploys needed.

export const sectionRegistry = {
  hero_poster:        HeroPoster,
  product_rail:       ProductRail,
  duo_poster:         DuoPoster,
  brand_cloud:        BrandCloud,
  ribbon_marquee:     RibbonMarquee,
  collection_slider:  CollectionLinkSlider,
  editorial_quote:    EditorialQuote,
  split_banner:       SplitBanner,
  trio_grid:          TrioGrid,
  poster_triptych:    PosterTriptych,
} as const

type SectionType = keyof typeof sectionRegistry

export function renderSection(type: SectionType, data: unknown) {
  const Component = sectionRegistry[type]
  return <Component data={data} />
}`,
    },
  },
  {
    id: "avara",
    title: "Avara",
    subtitle: "Modern Digital Banking Platform",
    type: "fullstack",
    status: "live",
    year: "2025",
    liveUrl: "https://av4ra.com",
    githubUrls: ["https://github.com/yznki/avara-client", "https://github.com/yznki/avara-api"],
    figmaUrl: null,
    description:
      "A full-stack digital banking platform featuring seamless financial management, transaction tracking, analytics dashboards, and secure auth — built and deployed to production.",
    longDescription:
      "Avara is a modern banking web app that reimagines how users interact with their finances. It combines a clean, minimal React 19 frontend with a robust Node.js/Express API backend. The platform supports full account management, transaction history, analytics via Recharts, and secure auth flows powered by Auth0. The UI is built with shadcn/ui and Radix primitives on Tailwind CSS v4, with Framer Motion for fluid animations.",
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Auth0",
      "Tailwind CSS",
      "REST API",
      "Recharts",
      "Vite",
    ],
    highlights: [
      "Full-stack banking platform deployed to production at av4ra.com",
      "Auth0-powered authentication with JWT authorization middleware",
      "RESTful API documented with Swagger/OpenAPI",
      "Interactive analytics dashboards built with Recharts",
      "Cloudinary integration for profile media management",
      "shadcn/ui + Radix primitives with Framer Motion animations",
    ],
    caseStudy: {
      problem:
        "Personal finance tools are either bloated and complex, or too minimal to be useful. Users need a clean interface to manage accounts and understand spending without cognitive overhead.",
      solution:
        "Built a minimalist banking UI with clear data visualization and streamlined transaction flows. Separated concerns with a dedicated REST API to support future mobile clients.",
      outcome:
        "Fully deployed live application at av4ra.com with complete auth, transaction management, and analytics — built solo from scratch.",
    },
    narrative:
      "The idea started with a FigJam board and a simple question: what would a banking app look like if you stripped away everything unnecessary? Avara started as sketches — API structure on sticky notes, wireframes drawn freehand, inspiration boards of the cleanest dashboards on the internet. Everything was planned before a single component was built.",
    brandDescription:
      "Avara's identity started with the 'A/' monogram — a nod to the idea of a forward slash, always moving forward. The wordmark is minimal, the palette dark and confident. The UI language is all whitespace, sharp type, and data that speaks for itself.",
    wireframesNote:
      "Before touching code, the entire flow was sketched on paper and mapped in FigJam — login, signup, password reset, admin dashboard, user app, and user detail views. The API shape was defined first, then the UI was built around it.",
    figmaUrls: [
      {
        label: "Planning Board",
        url: "https://www.figma.com/board/fZkyBXKnrbSYxwDIodWJe1/Avara-Planning",
      },
    ],
  },
  {
    id: "zaraa",
    title: "Zaraa",
    subtitle: "Plant Care & Companion App",
    type: "uiux",
    status: "design_complete",
    year: "2024",
    liveUrl: null,
    githubUrls: ["https://github.com/zaraa-app/zaraa-client"],
    figmaUrl: "https://www.figma.com/design/wonqHG2HA22bJkWKJykCmB/Zaraa",
    description:
      "A gamified mobile app for plant lovers to track, care for, and grow their collections — with cute illustrated plant companions, care reminders, growth tracking, and community leaderboards.",
    longDescription:
      "Zaraa is a plant care companion app that makes plant parenting fun and approachable. The full high-fidelity design covers onboarding, plant discovery, care scheduling with reminders, growth tracking, and a social leaderboard. The visual identity uses a lush green palette with a custom illustrated set of plant characters that react to how well you care for them.",
    tags: ["Mobile App", "UI/UX", "Figma", "iOS", "Gamification", "Product Design"],
    highlights: [
      "Complete high-fidelity mobile app design end-to-end",
      "Custom illustrated plant character set (9 unique characters)",
      "Gamified care system with responsive plant avatars",
      "Community leaderboard and social features",
      "Full design system with reusable components",
      "Onboarding, navigation, and settings flows fully designed",
    ],
    caseStudy: {
      problem:
        "Plant owners frequently forget watering schedules or misidentify care needs. Existing apps are either too utilitarian or require botanical expertise to use effectively.",
      solution:
        "Designed a gamified companion app where cute plant avatars visually respond to care quality. Push reminders, care logs, and social leaderboards motivate consistent routines and make it feel rewarding.",
      outcome:
        "Full high-fidelity Figma prototype with a polished visual identity, covering all core user flows from onboarding to community features.",
    },
    narrative:
      "Plants die. Not because people don't care — but because they forget, or don't know when to water, when to feed, when to move them to a sunnier spot. Zaraa started with a simple question: what if your plant could tell you how it feels? The concept grew into a full gamified companion app with illustrated plant characters that react to how well you care for them.",
    brandDescription:
      "Zaraa's brand is built around life and growth. The lush green palette feels organic and alive. The real star of the brand: a set of 9 custom illustrated plant characters — each with a distinct personality — that react to your care habits. They're the emotional core of the product.",
    figmaUrls: [
      {
        label: "Full Design File",
        url: "https://www.figma.com/design/wonqHG2HA22bJkWKJykCmB/Zaraa",
      },
      {
        label: "Brainstorming",
        url: "https://www.figma.com/board/UnIXbmzOBySX1EEQ8nDra3/Brainstorming",
      },
    ],
  },
  {
    id: "sehaty",
    title: "Sehaty",
    subtitle: "Healthcare Appointment Platform",
    type: "uiux",
    status: "design_complete",
    year: "2024",
    liveUrl: null,
    githubUrls: [],
    figmaUrl: "https://www.figma.com/design/9a7AtAPx48bCaKi4ebG5w2/Sehaty",
    description:
      "A mobile health platform for booking medical appointments, scheduling video consultations, and accessing lab results — designed for MENA markets with full Arabic language support.",
    longDescription:
      "Sehaty (Arabic: 'My Health') simplifies healthcare access in MENA markets. The product covers patient onboarding, doctor and clinic discovery, appointment booking, video consultation scheduling, and lab result viewing. The design follows a clean monochromatic style with strong typographic hierarchy, built bilingual from the ground up.",
    tags: ["Mobile App", "UI/UX", "Figma", "Healthcare", "Arabic", "iOS", "Product Design"],
    highlights: [
      "End-to-end patient journey from signup to lab result viewing",
      "Hospital, clinic, and doctor appointment booking flow",
      "Video consultation booking and scheduling design",
      "Lab results viewer with detailed breakdowns",
      "Wireframe-to-high-fidelity design progression documented",
      "Bilingual Arabic/English product design throughout",
    ],
    caseStudy: {
      problem:
        "Healthcare access in the MENA region is fragmented — patients call multiple clinics, lose track of results, and have no central record. The system is inefficient and stressful to navigate.",
      solution:
        "Designed a unified health platform aggregating hospitals, clinics, and doctors with seamless booking, reminders, and centralized record management.",
      outcome:
        "Complete high-fidelity mobile prototype covering the full patient experience with a clean bilingual design system.",
    },
    narrative:
      "Healthcare access in MENA is still done over the phone. Multiple apps, lost paper results, calling clinics to check availability. Sehaty was designed to fix that — one app to find doctors, book appointments, join video consultations, and see your lab results. Designed bilingual from day one, because your health shouldn't depend on which language the app speaks.",
    brandDescription:
      "Sehaty's design language is intentionally clinical — clean, monochromatic, trustworthy. The minimal UI puts medical information front and center with no distractions. The bilingual design system was built RTL-first to ensure Arabic speakers got an equally polished experience.",
    wireframesNote:
      "The wireframe stage was extensive — every patient touchpoint was mapped in lo-fi before any visual design was applied. The goal was to get the UX logic right before making it look good.",
    figmaUrls: [
      {
        label: "Full Design File",
        url: "https://www.figma.com/design/9a7AtAPx48bCaKi4ebG5w2/Sehaty",
      },
      {
        label: "Brainstorming",
        url: "https://www.figma.com/board/UnIXbmzOBySX1EEQ8nDra3/Brainstorming",
      },
    ],
  },
  {
    id: "le3beti",
    title: "Le3beti",
    subtitle: "لعبتي — Gamified Learning Platform",
    type: "uiux",
    status: "design_complete",
    year: "2023",
    liveUrl: null,
    githubUrls: [],
    figmaUrl: "https://www.figma.com/design/CjI6R9XbHJarZGMjg6zFXH/EduEmpower",
    description:
      'A gamified Arabic learning platform with course management, student dashboards, and an "Ultimate Speed Math" racing mini-game — designed for web and mobile with full RTL Arabic support.',
    longDescription:
      "Le3beti (لعبتي — \"My Game\") is a full-featured edtech platform designed to make learning feel like play. The platform spans web and mobile with a course management system, student and teacher dashboards, and a gamified math speed game where students race each other in arithmetic challenges. The Speed Math game is the centerpiece — a racing-themed UI that makes arithmetic practice competitive and genuinely engaging. Built RTL-first with full Arabic support throughout.",
    tags: [
      "EdTech",
      "UI/UX",
      "Figma",
      "Web & Mobile",
      "Gamification",
      "RTL/Arabic",
      "Product Design",
    ],
    highlights: [
      "Web and mobile platform with a unified design system",
      'Gamified "Ultimate Speed Math" racing game UI',
      "Multi-role platform: student, teacher, and admin views",
      "Full RTL Arabic language support throughout",
      "Course catalog, enrollment, and progress tracking flows",
      "Student performance dashboards and leaderboards",
    ],
    caseStudy: {
      problem:
        "Students disengage from rote learning platforms. EdTech needs to compete with games for attention — especially for younger audiences who expect interactive, dynamic experiences.",
      solution:
        "Designed a platform blending course management with gamified elements, including a multiplayer-style math racing game to make practice feel rewarding and competitive.",
      outcome:
        "Full multi-screen design for web and mobile covering all user roles, with a distinctive visual identity and complete interaction flows.",
    },
    narrative:
      "Kids disengage when learning feels like homework. Le3beti started with a simple provocation: what if practicing math felt like playing a racing game? The name — لعبتي, \"My Game\" — says it all. The platform was designed to blend real curriculum tools with a genuinely fun competitive experience. The Speed Math game is the centerpiece — students race each other in arithmetic challenges, with a full racing-game visual treatment.",
    brandDescription:
      "Le3beti uses a split identity — serious and structured for teachers, energetic and playful for students. The Speed Math game has its own bold visual language: racing aesthetics, countdown timers, and competitive scoring that makes arithmetic feel like a sport.",
    figmaUrls: [
      {
        label: "Full Design File",
        url: "https://www.figma.com/design/CjI6R9XbHJarZGMjg6zFXH/EduEmpower",
      },
      {
        label: "Brainstorming",
        url: "https://www.figma.com/board/UnIXbmzOBySX1EEQ8nDra3/Brainstorming",
      },
    ],
  },
];

export const brainstormingUrl = "https://www.figma.com/board/UnIXbmzOBySX1EEQ8nDra3/Brainstorming";
