<script setup lang="ts">
import { projects } from "~/data/projects";

const props = defineProps<{ currentProjectId: string }>();
const router = useRouter();

const currentIndex = computed(() => projects.findIndex((p) => p.id === props.currentProjectId));
const next = computed(() => projects[(currentIndex.value + 1) % projects.length]);

const hoverTints: Record<string, string> = {
  optionqaaf: "linear-gradient(135deg, #1a0533 0%, #0a0518 50%, #020014 100%)",
  avara: "linear-gradient(135deg, #001a2c 0%, #000d1a 50%, #010104 100%)",
  zaraa: "linear-gradient(135deg, #0a1a08 0%, #051205 50%, #010904 100%)",
  sehaty: "linear-gradient(135deg, #001a2c 0%, #000f1a 50%, #010209 100%)",
  le3beti: "linear-gradient(135deg, #1a0c00 0%, #0f0600 50%, #050201 100%)",
};

const typeBadge = computed(() => {
  if (!next.value) return null;
  switch (next.value.type) {
    case "fullstack":
      return { label: "Full-Stack", cls: "bg-primary-500/20 text-primary-300 border border-primary-500/30" };
    case "uiux":
      return { label: "UI/UX Design", cls: "bg-accent-500/20 text-accent-300 border border-accent-500/30" };
    case "mobile":
      return { label: "Mobile App", cls: "bg-sky-500/20 text-sky-300 border border-sky-500/30" };
  }
  return null;
});

const hover = ref(false);
const imgLoaded = ref(false);
const imgErrored = ref(false);
</script>

<template>
  <div v-if="next" class="mt-0">
    <!-- Section label -->
    <div class="mx-auto max-w-4xl px-6 py-8">
      <div class="flex items-center gap-4">
        <span class="text-xs text-white/25 font-semibold uppercase tracking-widest">
          Next Project
        </span>
        <div class="flex-1 h-px bg-white/[0.06]" />
      </div>
    </div>

    <!-- Next project card -->
    <div
      class="relative overflow-hidden cursor-pointer group transition-all duration-500"
      style="min-height: 280px"
      @click="router.push(`/projects/${next.id}`)"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <!-- Hero image -->
      <NuxtImg
        :src="`/project-media/${next.id}/hero.png`"
        :alt="next.title"
        draggable="false"
        class="absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-700"
        :class="
          imgLoaded && !imgErrored
            ? ['opacity-100', hover ? 'scale-105' : 'scale-100']
            : 'opacity-0'
        "
        @load="imgLoaded = true"
        @error="imgErrored = true"
      />

      <!-- Gradient fallback -->
      <div
        class="absolute inset-0 transition-opacity duration-700"
        :class="imgLoaded && !imgErrored ? 'opacity-0' : 'opacity-100'"
        :style="{ background: hoverTints[next.id] }"
      />

      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20 transition-opacity duration-500"
        :class="hover ? 'opacity-90' : 'opacity-100'"
      />

      <!-- Content -->
      <div
        class="relative z-10 flex flex-col items-center justify-center h-full py-16 px-6 text-center"
        style="min-height: 280px"
      >
        <span
          v-if="typeBadge"
          class="text-[10px] font-semibold px-2 py-1 rounded-full mb-4"
          :class="typeBadge.cls"
        >
          {{ typeBadge.label }}
        </span>

        <h2
          class="text-3xl md:text-5xl font-black text-white mb-3 leading-tight transition-transform duration-500"
          :class="hover ? '-translate-y-1' : 'translate-y-0'"
        >
          {{ next.title }}
        </h2>
        <p class="text-white/50 text-base mb-8 max-w-md">{{ next.subtitle }}</p>

        <div
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white/70 text-sm font-semibold transition-all duration-300"
          :class="hover ? 'border-primary-500/60 text-primary-300 bg-primary-500/10' : ''"
        >
          View Case Study
          <FontAwesomeIcon
            icon="fa-arrow-right"
            class="text-xs transition-transform duration-300"
            :class="hover ? 'translate-x-1' : 'translate-x-0'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
