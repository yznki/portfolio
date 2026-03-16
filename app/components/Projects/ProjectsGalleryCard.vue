<script setup lang="ts">
import type { Project } from "~/data/projects";

const props = defineProps<{ project: Project }>();

const router = useRouter();
const imgLoaded = ref(false);
const imgErrored = ref(false);

interface PlaceholderConfig {
  gradient: string;
  glyph: string;
  textDark: boolean;
}

// TODO: replace gradients when hero images are added per project
const placeholders: Record<string, PlaceholderConfig> = {
  optionqaaf: {
    gradient: "linear-gradient(145deg, #18181b 0%, #27272a 50%, #292524 100%)",
    glyph: "ق",
    textDark: false,
  },
  avara: {
    gradient: "linear-gradient(145deg, #0f172a 0%, #1e293b 50%, #1e3a5f 100%)",
    glyph: "Av",
    textDark: false,
  },
  zaraa: {
    gradient: "linear-gradient(145deg, #14532d 0%, #166534 50%, #15803d 100%)",
    glyph: "🌿",
    textDark: false,
  },
  sehaty: {
    gradient: "linear-gradient(145deg, #f1f5f9 0%, #ffffff 50%, #e2e8f0 100%)",
    glyph: "✚",
    textDark: true,
  },
  le3beti: {
    gradient: "linear-gradient(145deg, #f97316 0%, #f59e0b 50%, #eab308 100%)",
    glyph: "⚡",
    textDark: true,
  },
};

const placeholder = computed(
  () =>
    placeholders[props.project.id] ?? {
      gradient: "linear-gradient(135deg, #020024, #010104)",
      glyph: "",
      textDark: false,
    }
);

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
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl cursor-pointer border border-white/[0.07] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-primary-500/20 hover:shadow-[0_16px_56px_rgba(0,0,0,0.55)]"
    @click="router.push(`/projects/${project.id}`)"
  >
    <!-- Image / placeholder area -->
    <div class="relative overflow-hidden aspect-[4/3]">
      <!-- Hero image -->
      <NuxtImg
        :src="`/project-media/${project.id}/hero.png`"
        :alt="project.title"
        draggable="false"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        :class="imgLoaded && !imgErrored ? 'opacity-100' : 'opacity-0'"
        @load="imgLoaded = true"
        @error="imgErrored = true"
      />

      <!-- Placeholder (project-specific gradient + glyph) -->
      <div
        v-if="!imgLoaded || imgErrored"
        class="absolute inset-0 flex items-center justify-center overflow-hidden"
        :style="{ background: placeholder.gradient }"
      >
        <span
          class="text-[7rem] md:text-[9rem] font-black select-none leading-none transition-transform duration-500 group-hover:scale-110"
          :class="placeholder.textDark ? 'text-black/[0.12]' : 'text-white/[0.12]'"
        >
          {{ placeholder.glyph }}
        </span>
      </div>

      <!-- Hover darkening -->
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/12 transition-colors duration-400 pointer-events-none"
      />
    </div>

    <!-- Info bar -->
    <div class="px-5 py-4 border-t border-white/[0.05] bg-background/80 backdrop-blur-sm">
      <!-- Title row -->
      <div class="flex items-start justify-between gap-3 mb-1">
        <h3
          class="font-black text-text-color text-base leading-tight transition-colors duration-200 group-hover:text-white"
        >
          {{ project.title }}
        </h3>
        <div class="flex items-center gap-2 flex-shrink-0 pt-0.5">
          <div v-if="project.status === 'live'" class="flex items-center gap-1">
            <span class="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span class="text-[10px] text-green-400 font-medium">
              {{ project.liveUrl ? "Live" : "In Prod" }}
            </span>
          </div>
          <span
            v-else-if="project.status === 'design_complete'"
            class="text-[10px] text-white/30 font-medium"
          >
            Complete
          </span>
          <span class="text-[10px] text-white/25 font-medium">{{ project.year }}</span>
        </div>
      </div>

      <!-- Subtitle -->
      <p class="text-white/40 text-xs mb-3 leading-snug">{{ project.subtitle }}</p>

      <!-- Tags + arrow -->
      <div class="flex items-center justify-between gap-2">
        <div class="flex flex-wrap gap-1.5">
          <span
            class="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            :class="typeBadge?.cls"
          >
            {{ typeBadge?.label }}
          </span>
          <span
            v-for="tag in project.tags.slice(0, 2)"
            :key="tag"
            class="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-white/35 border border-white/[0.06] font-medium"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Arrow -->
        <div
          class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-white/20 transition-all duration-300 group-hover:border-primary-500/50 group-hover:text-primary-400 group-hover:translate-x-0.5"
        >
          <FontAwesomeIcon icon="fa-arrow-right" class="text-[9px]" />
        </div>
      </div>
    </div>
  </div>
</template>
