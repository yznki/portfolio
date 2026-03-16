<script setup lang="ts">
import type { Project } from "~/data/projects";

const props = defineProps<{
  project: Project;
  animDelay?: number;
}>();

const router = useRouter();
const hover = ref(false);
const isSmallDevice = ref(false);
const visible = ref(false);
const cardEl = ref<HTMLElement | null>(null);

function checkDevice() {
  isSmallDevice.value = window.matchMedia("(max-width: 768px)").matches;
}

onMounted(() => {
  checkDevice();
  window.addEventListener("resize", checkDevice);

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  if (cardEl.value) observer.observe(cardEl.value);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkDevice);
});

function goToProject() {
  router.push(`/projects/${props.project.id}`);
}

const gradientMap: Record<string, string> = {
  optionqaaf: "linear-gradient(135deg, #1a0533 0%, #0a0518 50%, #020014 100%)",
  avara: "linear-gradient(135deg, #001a2c 0%, #000d1a 50%, #010104 100%)",
  zaraa: "linear-gradient(135deg, #0a1a08 0%, #051205 50%, #010904 100%)",
  sehaty: "linear-gradient(135deg, #001a2c 0%, #000f1a 50%, #010209 100%)",
  le3beti: "linear-gradient(135deg, #1a0c00 0%, #0f0600 50%, #050201 100%)",
};

const cardGradient = computed(
  () => gradientMap[props.project.id] ?? "linear-gradient(135deg, #020024 0%, #010104 100%)"
);

const typeLabel = computed(() => {
  switch (props.project.type) {
    case "fullstack":
      return "Full-Stack";
    case "uiux":
      return "UI/UX Design";
    case "mobile":
      return "Mobile App";
  }
});

const showOverlay = computed(() => isSmallDevice.value || hover.value);
const displayTags = computed(() => props.project.tags.slice(0, 4));
</script>

<template>
  <div
    ref="cardEl"
    class="relative h-72 w-full overflow-hidden cursor-pointer transition-all duration-700 ease-out"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
    :style="{ transitionDelay: `${animDelay ?? 0}ms` }"
    @click="goToProject"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Gradient background -->
    <div
      class="absolute inset-0 transition-transform duration-700 ease-out"
      :class="hover ? 'scale-105' : 'scale-100'"
      :style="{ background: cardGradient }"
    />

    <!-- Radial glow on hover -->
    <div
      class="absolute inset-0 pointer-events-none transition-opacity duration-500"
      :class="hover ? 'opacity-100' : 'opacity-0'"
      style="background: radial-gradient(ellipse at 50% -10%, rgba(115, 108, 239, 0.18) 0%, transparent 65%)"
    />

    <!-- Type label — top left, plain text -->
    <div class="absolute top-3 left-3 z-10">
      <span class="text-[10px] font-medium uppercase tracking-[0.1em] text-white/40">
        {{ typeLabel }}
      </span>
    </div>

    <!-- Year + live status — top right, plain text -->
    <div class="absolute top-3 right-3 z-10 flex items-center gap-2">
      <span v-if="project.status === 'live'" class="text-[10px] font-mono text-white/40 uppercase tracking-wide">Live</span>
      <span class="text-[10px] text-white/30 font-mono">{{ project.year }}</span>
    </div>

    <!-- Large project initial -->
    <div
      class="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500"
      :class="showOverlay ? 'opacity-10 scale-125' : 'opacity-30 scale-100'"
    >
      <span class="text-[7rem] font-black text-white leading-none select-none">
        {{ project.title[0] }}
      </span>
    </div>

    <!-- Bottom info overlay -->
    <div
      class="absolute bottom-0 left-0 right-0 px-4 pt-10 pb-4 transition-transform duration-500 ease-out bg-gradient-to-t from-black/95 via-black/70 to-transparent"
      :class="showOverlay ? 'translate-y-0' : 'translate-y-full'"
    >
      <p class="font-bold text-text-color text-base leading-tight">{{ project.title }}</p>
      <p class="text-white/50 text-sm mb-2">{{ project.subtitle }}</p>
      <div class="flex flex-wrap gap-1">
        <span
          v-for="tag in displayTags"
          :key="tag"
          class="text-[10px] px-2 py-0.5 rounded-sm bg-white/[0.06] text-white/45 border border-white/[0.08]"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Border on hover -->
    <div
      class="absolute inset-0 pointer-events-none border transition-colors duration-500"
      :class="hover ? 'border-primary-500/20' : 'border-transparent'"
    />
  </div>
</template>
