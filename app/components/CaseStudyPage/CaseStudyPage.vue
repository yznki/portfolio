<script setup lang="ts">
import { projects, type Project } from "~/data/projects";
import type { ShowcaseImage } from "~/components/CaseStudy/CaseStudyScreenShowcase.vue";

const props = defineProps<{ projectId: string }>();

const project = computed<Project | undefined>(() => projects.find((p) => p.id === props.projectId));

// ── Nav sections ────────────────────────────────────────────────────────────
const navSections = computed(() => {
  const sections = [
    { id: "cs-idea", label: "Idea" },
    { id: "cs-brand", label: "Brand" },
    { id: "cs-screens", label: "Screens" },
  ];
  if (project.value?.type !== "uiux") {
    sections.push({ id: "cs-code", label: "Code" });
  }
  return sections;
});

// ── Per-project HiFi screen images ──────────────────────────────────────────
const hifiImages = computed<ShowcaseImage[]>(() => {
  switch (props.projectId) {
    case "optionqaaf":
      return [
        {
          src: "/project-media/optionqaaf/mockup-1.png",
          label: "mockup-1",
          caption: "Choose Your Country. Expect Fast Delivery.",
        },
        {
          src: "/project-media/optionqaaf/mockup-2.png",
          label: "mockup-2",
          caption: "Fresh Drops. Fresh Fits.",
        },
        {
          src: "/project-media/optionqaaf/mockup-3.png",
          label: "mockup-3",
          caption: "Endless Categories. Zero Limits.",
        },
        {
          src: "/project-media/optionqaaf/mockup-4.png",
          label: "mockup-4",
          caption: "Scroll. Tap. Add to Cart. Repeat.",
        },
        {
          src: "/project-media/optionqaaf/mockup-5.png",
          label: "mockup-5",
          caption: "Up Close, In Detail. Shop With Confidence.",
        },
        {
          src: "/project-media/optionqaaf/mockup-6.png",
          label: "mockup-6",
          caption: "Personalized. Curated. Exclusively yours.",
        },
        {
          src: "/project-media/optionqaaf/mockup-7.png",
          label: "mockup-7",
          caption: "Ready When You Are. Checkout in Seconds.",
        },
        {
          src: "/project-media/optionqaaf/mockup-8.png",
          label: "mockup-8",
          caption: "Track Your Orders Like a Pro.",
        },
      ];
    case "avara":
      return [
        {
          src: "/project-media/avara/hifi-dashboard.png",
          label: "Dashboard",
          caption: "Banking Dashboard",
        },
        {
          src: "/project-media/avara/hifi-transactions.png",
          label: "Transactions",
          caption: "Transaction History",
        },
      ];
    case "zaraa":
      return [
        { src: "/project-media/zaraa/onboarding-1.png", label: "onboarding-1", caption: "Welcome" },
        {
          src: "/project-media/zaraa/onboarding-2.png",
          label: "onboarding-2",
          caption: "Plant Setup",
        },
        {
          src: "/project-media/zaraa/onboarding-3.png",
          label: "onboarding-3",
          caption: "Care Guide",
        },
        { src: "/project-media/zaraa/hifi-home.png", label: "Home", caption: "My Garden" },
        {
          src: "/project-media/zaraa/hifi-leaderboard.png",
          label: "Leaderboard",
          caption: "Leaderboard",
        },
        { src: "/project-media/zaraa/hifi-profile.png", label: "Profile", caption: "Profile" },
      ];
    case "sehaty":
      return [
        // { src: "/project-media/sehaty/hero.png", label: "Login", caption: "Login Screen" },
        { src: "/project-media/sehaty/home.png", label: "Home", caption: "Home" },
        {
          src: "/project-media/sehaty/bookings.png",
          label: "Bookings",
          caption: "Appointment Bookings",
        },
        {
          src: "/project-media/sehaty/hifi-results.png",
          label: "Lab Results",
          caption: "Lab Results",
        },
        {
          src: "/project-media/sehaty/hifi-prescriptions.png",
          label: "Prescriptions",
          caption: "Prescriptions",
        },
      ];
    case "le3beti":
      return [
        {
          src: "/project-media/le3beti/speedmath-1.png",
          label: "Speed Math",
          caption: "Speed Math Race",
        },
        {
          src: "/project-media/le3beti/speedmath-2.png",
          label: "Speed Math 2",
          caption: "Game Results",
        },
        {
          src: "/project-media/le3beti/dashboard.png",
          label: "Dashboard",
          caption: "Student Dashboard",
        },
        { src: "/project-media/le3beti/mobile.png", label: "Mobile", caption: "Mobile App" },
      ];
    default:
      return [];
  }
});

// ── Per-project wireframe images ─────────────────────────────────────────────
const wireframeImages = computed<ShowcaseImage[]>(() => {
  switch (props.projectId) {
    case "avara":
      return [
        {
          src: "/project-media/avara/wireframe-1.png",
          label: "wireframe-1",
          caption: "Login / Sign Up / Reset flows",
        },
        {
          src: "/project-media/avara/wireframe-2.png",
          label: "wireframe-2",
          caption: "Admin Dashboard / User App",
        },
        {
          src: "/project-media/avara/brainstorm.png",
          label: "brainstorm",
          caption: "API & Feature Planning",
        },
        {
          src: "/project-media/avara/inspiration.png",
          label: "inspiration",
          caption: "Inspiration Board",
        },
      ];
    case "sehaty":
      return [{ src: "/project-media/sehaty/wireframes.png", label: "wireframes", caption: "" }];
    default:
      return [];
  }
});

// ── Per-project brand images ──────────────────────────────────────────────────
const brandImages = computed<ShowcaseImage[]>(() => {
  switch (props.projectId) {
    case "optionqaaf":
      return [
        { src: "/project-media/optionqaaf/logo.png", label: "logo", caption: "Brand Mark — ق" },
        {
          src: "/project-media/optionqaaf/brand-colors.png",
          label: "brand-colors",
          caption: "Color Palette",
        },
      ];
    case "avara":
      return [
        {
          src: "/project-media/avara/logo-sketches.png",
          label: "logo-sketches",
          caption: "Logo Exploration",
        },
        {
          src: "/project-media/avara/inspiration.png",
          label: "inspiration",
          caption: "Inspiration Board",
        },
      ];
    case "zaraa":
      return [
        { src: "/project-media/zaraa/logo.png", label: "logo", caption: "Zaraa Wordmark" },
        {
          src: "/project-media/zaraa/brand-colors.png",
          label: "brand-colors",
          caption: "Color Palette",
        },
        {
          src: "/project-media/zaraa/characters.png",
          label: "characters",
          caption: "Plant Character Set — 9 illustrated companions",
        },
      ];
    case "sehaty":
      return [{ src: "/project-media/sehaty/logo.png", label: "logo", caption: "Sehaty Logo" }];
    case "le3beti":
      return [
        { src: "/project-media/le3beti/logo.png", label: "logo", caption: "Le3beti Wordmark" },
      ];
    default:
      return [];
  }
});

// ── Showcase layout per project ───────────────────────────────────────────────
const hifiLayout = computed<"scroll-strip" | "grid" | "showcase">(() => {
  if (props.projectId === "avara") return "grid";
  if (props.projectId === "le3beti") return "grid";
  return "scroll-strip";
});

const hifiAspect = computed<"screen" | "wide" | "square" | "auto">(() => {
  if (props.projectId === "avara") return "wide";
  if (props.projectId === "le3beti") return "wide";
  return "screen";
});
</script>

<template>
  <div v-if="project" class="relative">
    <!-- Fixed: scroll progress bar -->
    <CaseStudyProgressBar />

    <!-- Sticky mini-nav (appears after hero) -->
    <CaseStudyStickyNav :sections="navSections" />

    <!-- ── HERO ─────────────────────────────────────────────────── -->
    <CaseStudyHero :project="project" />

    <!-- ── CONTENT BODY ──────────────────────────────────────────── -->
    <div class="mx-auto max-w-4xl px-6">
      <!-- ── 1. THE IDEA ─────────────────────────────────────────── -->
      <CaseStudySection id="cs-idea" data-cs-section class="py-16 md:py-20">
        <div class="flex items-center gap-4 mb-10">
          <span
            class="text-[10px] text-primary-500/70 font-bold tracking-[0.25em] uppercase font-mono"
          >
            01 — The Idea
          </span>
          <div class="flex-1 h-px bg-white/[0.06]" />
        </div>

        <!-- Problem / Solution / Outcome cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div class="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="h-8 w-8 rounded-lg bg-primary-500/15 flex items-center justify-center flex-shrink-0"
              >
                <FontAwesomeIcon icon="fa-magnifying-glass" class="text-primary-400 text-sm" />
              </div>
              <h3 class="font-bold text-text-color text-xs uppercase tracking-widest">Problem</h3>
            </div>
            <p class="text-white/60 leading-relaxed text-sm">{{ project.caseStudy.problem }}</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="h-8 w-8 rounded-lg bg-accent-500/15 flex items-center justify-center flex-shrink-0"
              >
                <FontAwesomeIcon icon="fa-lightbulb" class="text-accent-400 text-sm" />
              </div>
              <h3 class="font-bold text-text-color text-xs uppercase tracking-widest">Solution</h3>
            </div>
            <p class="text-white/60 leading-relaxed text-sm">{{ project.caseStudy.solution }}</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="h-8 w-8 rounded-lg bg-green-500/15 flex items-center justify-center flex-shrink-0"
              >
                <FontAwesomeIcon icon="fa-chart-line" class="text-green-400 text-sm" />
              </div>
              <h3 class="font-bold text-text-color text-xs uppercase tracking-widest">Outcome</h3>
            </div>
            <p class="text-white/60 leading-relaxed text-sm">{{ project.caseStudy.outcome }}</p>
          </div>
        </div>

        <!-- Narrative paragraph -->
        <p
          v-if="project.narrative"
          class="text-lg md:text-xl text-white/70 leading-relaxed border-l-2 border-primary-500/40 pl-6"
        >
          {{ project.narrative }}
        </p>

        <!-- Architecture highlight (OptionQaaf) -->
        <div
          v-if="project.id === 'optionqaaf'"
          class="mt-10 rounded-xl border border-primary-500/40 bg-primary-500/[0.05] p-6"
        >
          <div class="flex items-center gap-3 mb-3">
            <FontAwesomeIcon icon="fa-layer-group" class="text-primary-400" />
            <h3 class="font-bold text-primary-300 text-xs uppercase tracking-widest">
              Architecture Highlight
            </h3>
          </div>
          <p class="text-white/70 leading-relaxed text-sm">
            The home page is fully CMS-driven via
            <span class="font-semibold text-primary-300">Shopify Metaobjects</span> — the marketing
            team controls banners, product rails, editorial blocks, and promos directly through the
            Shopify admin without any code deployments. This architecture decouples content from
            code entirely, enabling independent release cycles for marketing and engineering.
          </p>
        </div>
      </CaseStudySection>

      <!-- ── 2. DESIGN PROCESS (Brainstorming) ──────────────────── -->
      <CaseStudySection
        v-if="project.wireframesNote || (project.figmaUrls && project.figmaUrls.length > 0)"
        id="cs-process"
        data-cs-section
        class="py-16"
      >
        <div class="flex items-center gap-4 mb-10">
          <span
            class="text-[10px] text-primary-500/70 font-bold tracking-[0.25em] uppercase font-mono"
          >
            02 — Design Process
          </span>
          <div class="flex-1 h-px bg-white/[0.06]" />
        </div>

        <!-- Avara: has actual brainstorm images -->
        <template v-if="project.id === 'avara'">
          <p class="text-white/65 leading-relaxed mb-8 text-base">
            {{ project.wireframesNote }}
          </p>
          <CaseStudyScreenShowcase type="grid" aspect="wide" :images="wireframeImages" />
        </template>

        <!-- Sehaty: wireframe screens -->
        <template v-else-if="project.id === 'sehaty'">
          <p class="text-white/65 leading-relaxed mb-8 text-base">
            {{ project.wireframesNote }}
          </p>
          <CaseStudyScreenShowcase type="showcase" aspect="wide" :images="wireframeImages" />
        </template>

        <!-- Others: descriptive text + Figma links -->
        <template v-else>
          <p class="text-white/65 leading-relaxed mb-8 text-base max-w-2xl">
            The design process started with research and ideation before moving into Figma. Explore
            the early thinking and brainstorming behind this project.
          </p>
        </template>

        <!-- Figma links for all projects -->
        <div v-if="project.figmaUrls?.length" class="flex flex-wrap gap-3 mt-6">
          <CaseStudyFigmaCard
            v-for="fig in project.figmaUrls"
            :key="fig.url"
            :label="fig.label"
            :url="fig.url"
          />
        </div>
      </CaseStudySection>

      <!-- ── 3. BRAND & IDENTITY ─────────────────────────────────── -->
      <CaseStudySection v-if="project.brandDescription" id="cs-brand" data-cs-section class="py-16">
        <div class="flex items-center gap-4 mb-10">
          <span
            class="text-[10px] text-primary-500/70 font-bold tracking-[0.25em] uppercase font-mono"
          >
            03 — Brand & Identity
          </span>
          <div class="flex-1 h-px bg-white/[0.06]" />
        </div>

        <p class="text-white/65 leading-relaxed mb-10 text-base max-w-2xl">
          {{ project.brandDescription }}
        </p>

        <!-- Brand images — Zaraa characters get featured treatment -->
        <template v-if="project.id === 'zaraa'">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <CaseStudyImageSlot src="/project-media/zaraa/logo.png" label="logo" aspect="square" />
            <CaseStudyImageSlot
              src="/project-media/zaraa/brand-colors.png"
              label="brand-colors"
              aspect="square"
            />
          </div>
          <CaseStudyImageSlot
            src="/project-media/zaraa/characters.png"
            label="Plant Character Set — 9 illustrated companions"
            aspect="wide"
            class="w-full"
          />
        </template>
        <template v-else>
          <CaseStudyScreenShowcase type="grid" aspect="auto" :images="brandImages" />
        </template>
      </CaseStudySection>

      <!-- ── 4. HIGH FIDELITY ───────────────────────────────────── -->
      <CaseStudySection id="cs-screens" data-cs-section class="py-16">
        <div class="flex items-center gap-4 mb-10">
          <span
            class="text-[10px] text-primary-500/70 font-bold tracking-[0.25em] uppercase font-mono"
          >
            04 — High Fidelity
          </span>
          <div class="flex-1 h-px bg-white/[0.06]" />
        </div>

        <!-- Highlights list -->
        <ul class="flex flex-col gap-3 mb-10">
          <li
            v-for="h in project.highlights"
            :key="h"
            class="flex items-start gap-3 text-white/65 text-sm leading-relaxed"
          >
            <div
              class="h-5 w-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"
            >
              <FontAwesomeIcon icon="fa-check" class="text-primary-400 text-[10px]" />
            </div>
            {{ h }}
          </li>
        </ul>

        <!-- Screen showcase -->
        <CaseStudyScreenShowcase :type="hifiLayout" :aspect="hifiAspect" :images="hifiImages" />

        <!-- Avara live demo link -->
        <div v-if="project.id === 'avara'" class="mt-8 flex gap-3">
          <a
            href="https://av4ra.com"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold transition-colors duration-300 hover:bg-primary-300"
          >
            <FontAwesomeIcon icon="fa-arrow-up-right-from-square" class="text-xs" />
            View Live at av4ra.com
          </a>
        </div>

        <!-- Tech stack tags -->
        <div class="flex flex-wrap gap-2 mt-10">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="text-xs px-3 py-1.5 rounded-full bg-white/[0.05] text-white/50 border border-white/[0.08] font-medium"
          >
            {{ tag }}
          </span>
        </div>
      </CaseStudySection>

      <!-- ── 5. CODE & STACK (non-uiux only) ───────────────────── -->
      <CaseStudySection v-if="project.type !== 'uiux'" id="cs-code" data-cs-section class="py-16">
        <div class="flex items-center gap-4 mb-10">
          <span
            class="text-[10px] text-primary-500/70 font-bold tracking-[0.25em] uppercase font-mono"
          >
            05 — Code & Stack
          </span>
          <div class="flex-1 h-px bg-white/[0.06]" />
        </div>

        <!-- GitHub / live links -->
        <div class="flex flex-wrap gap-3 mb-10">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold transition-colors duration-300 hover:bg-primary-300"
          >
            <FontAwesomeIcon icon="fa-arrow-up-right-from-square" class="text-xs" />
            Live Site
          </a>
          <a
            v-for="(url, i) in project.githubUrls"
            :key="url"
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white/80 text-sm font-semibold transition-colors duration-300 hover:border-white/40 hover:text-white"
          >
            <FontAwesomeIcon :icon="['fab', 'github']" />
            {{ project.githubUrls.length > 1 ? (i === 0 ? "Client Repo" : "API Repo") : "GitHub" }}
          </a>
          <span
            v-if="project.id === 'optionqaaf'"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-white/30 text-sm font-medium cursor-default"
          >
            <FontAwesomeIcon :icon="['fab', 'github']" />
            Private Org Repo
          </span>
        </div>

        <!-- Code snippet -->
        <CaseStudyCodeTeaser
          v-if="project.codeSnippet"
          :filename="project.codeSnippet.filename"
          :language="project.codeSnippet.language"
          :code="project.codeSnippet.code"
          :description="project.codeSnippet.description"
        />
      </CaseStudySection>
    </div>
    <!-- end content body -->

    <!-- ── NEXT PROJECT ───────────────────────────────────────────── -->
    <CaseStudyNextProject :current-project-id="project.id" />
  </div>
</template>
