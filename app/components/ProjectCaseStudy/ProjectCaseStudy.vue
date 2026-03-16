<script setup lang="ts">
import type { Project } from "~/data/projects";
import { brainstormingUrl } from "~/data/projects";

const props = defineProps<{ project: Project }>();

const typeBadge = computed(() => {
  switch (props.project.type) {
    case "fullstack":
      return {
        label: "Full-Stack",
        cls: "bg-primary-500/20 text-primary-300 border border-primary-500/30",
      };
    case "uiux":
      return {
        label: "UI/UX Design",
        cls: "bg-accent-500/20 text-accent-300 border border-accent-500/30",
      };
    case "mobile":
      return {
        label: "Mobile App",
        cls: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
      };
  }
});

const statusDisplay = computed(() => {
  if (props.project.status === "live" && props.project.liveUrl)
    return { label: "Live", dot: true, cls: "text-green-400" };
  if (props.project.status === "live" && !props.project.liveUrl)
    return { label: "In Production", dot: true, cls: "text-green-400" };
  if (props.project.status === "design_complete")
    return { label: "Design Complete", dot: false, cls: "text-white/50" };
  return { label: "In Progress", dot: false, cls: "text-yellow-400" };
});
</script>

<template>
  <div class="mx-auto max-w-4xl px-6 py-12 md:py-16">
    <!-- Meta row: type · status · year -->
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <span class="text-[11px] font-semibold px-2.5 py-1 rounded-full" :class="typeBadge?.cls">
        {{ typeBadge?.label }}
      </span>
      <div class="flex items-center gap-1.5">
        <span
          v-if="statusDisplay.dot"
          class="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"
        />
        <span class="text-sm font-medium" :class="statusDisplay.cls">
          {{ statusDisplay.label }}
        </span>
      </div>
      <span class="text-white/30">·</span>
      <span class="text-sm text-white/40 font-medium">{{ project.year }}</span>
    </div>

    <!-- Title + subtitle -->
    <h1 class="text-4xl md:text-5xl font-black text-text-color mb-3 leading-tight">
      {{ project.title }}
    </h1>
    <p class="text-xl text-white/55 mb-8 leading-relaxed">{{ project.subtitle }}</p>

    <!-- Long description -->
    <p class="text-base text-white/75 leading-relaxed mb-8">{{ project.longDescription }}</p>

    <!-- Tech stack tags -->
    <div class="flex flex-wrap gap-2 mb-10">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="text-xs px-3 py-1.5 rounded-full bg-white/[0.06] text-white/60 border border-white/10 font-medium"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Action links -->
    <div class="flex flex-wrap gap-3 mb-16">
      <a
        v-if="project.liveUrl"
        :href="project.liveUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-semibold transition-colors duration-300 hover:bg-primary-300"
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
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white/80 text-sm font-semibold transition-colors duration-300 hover:border-white/40 hover:text-white"
      >
        <FontAwesomeIcon :icon="['fab', 'github']" />
        {{ project.githubUrls.length > 1 ? (i === 0 ? "Client Repo" : "API Repo") : "GitHub" }}
      </a>
      <a
        v-if="project.figmaUrl"
        :href="project.figmaUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-500/40 text-accent-300 text-sm font-semibold transition-colors duration-300 hover:border-accent-500/60 hover:bg-accent-500/10"
      >
        <FontAwesomeIcon :icon="['fab', 'figma']" />
        Figma Design
      </a>
    </div>

    <!-- Divider -->
    <div class="h-px bg-white/10 mb-12" />

    <!-- Case Study -->
    <section class="mb-14">
      <SectionHeading title="Case Study" bg-color="black" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <!-- Problem -->
        <div class="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="h-8 w-8 rounded-lg bg-primary-500/15 flex items-center justify-center flex-shrink-0"
            >
              <FontAwesomeIcon icon="fa-magnifying-glass" class="text-primary-400 text-sm" />
            </div>
            <h3 class="font-bold text-text-color text-sm uppercase tracking-widest">Problem</h3>
          </div>
          <p class="text-white/65 leading-relaxed text-sm">{{ project.caseStudy.problem }}</p>
        </div>

        <!-- Solution -->
        <div class="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="h-8 w-8 rounded-lg bg-accent-500/15 flex items-center justify-center flex-shrink-0"
            >
              <FontAwesomeIcon icon="fa-lightbulb" class="text-accent-400 text-sm" />
            </div>
            <h3 class="font-bold text-text-color text-sm uppercase tracking-widest">Solution</h3>
          </div>
          <p class="text-white/65 leading-relaxed text-sm">{{ project.caseStudy.solution }}</p>
        </div>

        <!-- Outcome -->
        <div class="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="h-8 w-8 rounded-lg bg-green-500/15 flex items-center justify-center flex-shrink-0"
            >
              <FontAwesomeIcon icon="fa-chart-line" class="text-green-400 text-sm" />
            </div>
            <h3 class="font-bold text-text-color text-sm uppercase tracking-widest">Outcome</h3>
          </div>
          <p class="text-white/65 leading-relaxed text-sm">{{ project.caseStudy.outcome }}</p>
        </div>
      </div>
    </section>

    <!-- Architecture Highlight — OptionQaaf only -->
    <section v-if="project.id === 'optionqaaf'" class="mb-14">
      <div class="rounded-xl border border-primary-500/40 bg-primary-500/[0.05] p-6">
        <div class="flex items-center gap-3 mb-4">
          <FontAwesomeIcon icon="fa-layer-group" class="text-primary-400" />
          <h3 class="font-bold text-primary-300 text-sm uppercase tracking-widest">
            Architecture Highlight
          </h3>
        </div>
        <p class="text-white/75 leading-relaxed text-sm">
          The home page is fully CMS-driven via
          <span class="font-semibold text-primary-300">Shopify Metaobjects</span> — the marketing
          team controls banners, product rails, editorial blocks, and promos directly through the
          Shopify admin without any code deployments. This architecture decouples content from code
          entirely, enabling independent release cycles for marketing and engineering. Built solo as
          a contractor engagement.
        </p>
      </div>
    </section>

    <!-- Highlights -->
    <section class="mb-14">
      <SectionHeading title="Highlights" bg-color="black" />
      <ul class="flex flex-col gap-3 mt-2">
        <li
          v-for="highlight in project.highlights"
          :key="highlight"
          class="flex items-start gap-3 text-white/70 text-sm leading-relaxed"
        >
          <div
            class="h-5 w-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"
          >
            <FontAwesomeIcon icon="fa-check" class="text-primary-400 text-[10px]" />
          </div>
          {{ highlight }}
        </li>
      </ul>
    </section>

    <!-- Design Brainstorming — UI/UX projects only -->
    <section v-if="project.type === 'uiux'" class="mb-14">
      <div class="h-px bg-white/10 mb-12" />
      <SectionHeading title="Design Process" bg-color="black" />
      <p class="text-white/60 text-sm mb-4 mt-2">
        Explore the brainstorming sessions, wireframes, and early-stage ideation behind this project
        on Figma.
      </p>
      <a
        :href="brainstormingUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-500/40 text-accent-300 text-sm font-semibold transition-colors duration-300 hover:border-accent-500/60 hover:bg-accent-500/10"
      >
        <FontAwesomeIcon :icon="['fab', 'figma']" />
        View Brainstorming Board
      </a>
    </section>
  </div>
</template>
