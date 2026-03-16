<script setup lang="ts">
import type { Project } from "~/data/projects";

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

// Gradient fallback when hero image is missing
const heroGradient = computed(() => {
  const map: Record<string, string> = {
    optionqaaf: "linear-gradient(160deg, #1a0533 0%, #0a0518 40%, #020014 100%)",
    avara: "linear-gradient(160deg, #001a2c 0%, #000d1a 40%, #010104 100%)",
    zaraa: "linear-gradient(160deg, #0a1a08 0%, #051205 40%, #010904 100%)",
    sehaty: "linear-gradient(160deg, #001a2c 0%, #000f1a 40%, #010209 100%)",
    le3beti: "linear-gradient(160deg, #1a0c00 0%, #0f0600 40%, #050201 100%)",
  };
  return map[props.project.id] ?? "linear-gradient(160deg, #020024 0%, #010104 100%)";
});

const heroLoaded = ref(false);
const heroErrored = ref(false);
const heroSrc = computed(() => `/project-media/${props.project.id}/hero.png`);

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <div
    id="cs-hero"
    class="relative overflow-hidden flex items-end"
    style="min-height: 72vh"
  >
    <!-- Hero image -->
    <NuxtImg
      v-if="mounted"
      :src="heroSrc"
      :alt="`${project.title} hero`"
      draggable="false"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      :class="heroLoaded && !heroErrored ? 'opacity-100' : 'opacity-0'"
      @load="heroLoaded = true"
      @error="heroErrored = true"
    />

    <!-- Gradient background (shows when no image) -->
    <div
      class="absolute inset-0 transition-opacity duration-700"
      :class="heroLoaded && !heroErrored ? 'opacity-0' : 'opacity-100'"
      :style="{ background: heroGradient }"
    />

    <!-- Radial glow for gradient state -->
    <div
      class="absolute inset-0 pointer-events-none"
      :class="heroLoaded && !heroErrored ? 'opacity-0' : 'opacity-100'"
      style="background: radial-gradient(ellipse at 20% 50%, rgba(115,108,239,0.2) 0%, transparent 60%)"
    />

    <!-- Dark gradient overlay on top of image -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10"
    />

    <!-- Content -->
    <div class="relative z-10 w-full mx-auto max-w-4xl px-6 pb-16 pt-40">
      <!-- Meta badges -->
      <div class="flex flex-wrap items-center gap-2.5 mb-6">
        <span
          class="text-[10px] font-semibold px-2.5 py-1 rounded-full"
          :class="typeBadge?.cls"
        >
          {{ typeBadge?.label }}
        </span>
        <div class="flex items-center gap-1.5">
          <span v-if="statusDisplay.dot" class="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          <span class="text-xs font-medium" :class="statusDisplay.cls">
            {{ statusDisplay.label }}
          </span>
        </div>
        <span class="text-white/30 text-xs">·</span>
        <span class="text-xs text-white/40 font-medium">{{ project.year }}</span>
      </div>

      <!-- Title -->
      <h1 class="text-5xl md:text-7xl font-black text-white mb-4 leading-[0.9] tracking-tight">
        {{ project.title }}
      </h1>
      <p class="text-lg md:text-xl text-white/55 mb-10 max-w-2xl leading-relaxed">
        {{ project.subtitle }}
      </p>

      <!-- CTA Links -->
      <div class="flex flex-wrap gap-3">
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
          {{ project.githubUrls.length > 1 ? (i === 0 ? "Client" : "API") : "GitHub" }}
        </a>
        <a
          v-for="fig in project.figmaUrls"
          :key="fig.url"
          :href="fig.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-accent-500/35 text-accent-300 text-sm font-semibold transition-colors duration-300 hover:border-accent-500/60 hover:bg-accent-500/10"
        >
          <FontAwesomeIcon :icon="['fab', 'figma']" />
          {{ fig.label }}
        </a>
      </div>
    </div>

    <!-- Bottom fade into page -->
    <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
  </div>
</template>
