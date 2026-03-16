<script setup lang="ts">
import type { Project } from "~/data/projects";

const props = defineProps<{
  project: Project;
  index: number;
  visible: boolean;
}>();

const emit = defineEmits<{
  "mouse-enter": [project: Project];
  "mouse-leave": [];
}>();

const router = useRouter();

const typeBadge = computed(() => {
  switch (props.project.type) {
    case "fullstack":
      return "Full-Stack";
    case "uiux":
      return "UI/UX Design";
    case "mobile":
      return "Mobile App";
  }
});

const displayTags = computed(() => props.project.tags.slice(0, 3).join(" · "));

const indexStr = computed(() => String(props.index + 1).padStart(2, "0"));
</script>

<template>
  <div
    class="group border-t border-white/[0.07] cursor-pointer transition-[opacity,transform] duration-500 ease-out"
    :style="{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(8px)',
      transitionDelay: `${index * 80}ms`,
    }"
    @click="router.push(`/projects/${project.id}`)"
    @mouseenter="emit('mouse-enter', project)"
    @mouseleave="emit('mouse-leave')"
  >
    <!-- Desktop row -->
    <div
      class="hidden md:grid grid-cols-12 gap-4 py-6 items-center group-hover:bg-white/[0.015] transition-colors duration-200"
    >
      <!-- Index -->
      <div class="col-span-1">
        <span class="text-[13px] font-mono text-white/25">{{ indexStr }}</span>
      </div>

      <!-- Project name + live indicator -->
      <div class="col-span-4 flex items-center gap-2">
        <span
          class="text-[1.35rem] font-semibold text-text-color leading-none transition-transform duration-200 ease-out inline-block group-hover:translate-x-[6px]"
        >
          {{ project.title }}
        </span>
        <div v-if="project.status === 'live'" class="flex items-center gap-1 flex-shrink-0">
          <span class="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          <span class="text-[10px] text-green-400 font-medium">Live</span>
        </div>
      </div>

      <!-- Category -->
      <div class="col-span-2">
        <span class="text-[12px] font-medium uppercase tracking-[0.08em] text-white/35">
          {{ typeBadge }}
        </span>
      </div>

      <!-- Tags -->
      <div class="col-span-3">
        <span class="text-[12px] text-white/30">{{ displayTags }}</span>
      </div>

      <!-- Year -->
      <div class="col-span-1">
        <span class="text-[12px] text-white/25 font-mono">{{ project.year }}</span>
      </div>

      <!-- Arrow -->
      <div class="col-span-1 flex justify-end">
        <span
          class="text-lg text-white/25 transition-all duration-200 ease-out group-hover:text-primary-400 group-hover:translate-x-1 group-hover:-translate-y-1 inline-block"
        >
          ↗
        </span>
      </div>
    </div>

    <!-- Mobile row -->
    <div
      class="md:hidden py-5 flex items-center justify-between gap-4 group-hover:bg-white/[0.015] transition-colors duration-200"
    >
      <div class="flex items-baseline gap-3 min-w-0">
        <span class="text-[12px] font-mono text-white/25 flex-shrink-0">{{ indexStr }}</span>
        <div class="min-w-0">
          <p class="text-base font-semibold text-text-color leading-tight">{{ project.title }}</p>
          <p class="text-[12px] text-white/35 mt-0.5">{{ typeBadge }} · {{ project.year }}</p>
        </div>
      </div>
      <span
        class="text-base text-white/25 flex-shrink-0 transition-all duration-200 group-hover:text-primary-400"
      >
        ↗
      </span>
    </div>
  </div>
</template>
