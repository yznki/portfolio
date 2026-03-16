<script setup lang="ts">
import type { Project } from "~/data/projects";

const props = defineProps<{
  project: Project | null;
}>();

const mouseX = ref(0);
const mouseY = ref(0);
const currentX = ref(0);
const currentY = ref(0);

let rafId: number;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function tick() {
  currentX.value = lerp(currentX.value, mouseX.value, 0.12);
  currentY.value = lerp(currentY.value, mouseY.value, 0.12);
  rafId = requestAnimationFrame(tick);
}

function onMouseMove(e: MouseEvent) {
  mouseX.value = e.clientX + 24;
  mouseY.value = e.clientY - 80;
}

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  tick();
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove);
  cancelAnimationFrame(rafId);
});

const previewImages: Record<string, string> = {
  optionqaaf: "/project-media/optionqaaf/hero.png",
  avara: "/project-media/avara/hero.png",
  zaraa: "/project-media/zaraa/hero.png",
  sehaty: "/project-media/sehaty/hero.png",
  le3beti: "/project-media/le3beti/hero.png",
};

const previewGradients: Record<string, string> = {
  optionqaaf: "linear-gradient(135deg, #18181b, #27272a)",
  avara: "linear-gradient(135deg, #0f172a, #1e3a5f)",
  zaraa: "linear-gradient(135deg, #14532d, #166534)",
  sehaty: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
  le3beti: "linear-gradient(135deg, #c2410c, #d97706)",
};

const imgLoaded = ref(false);
const imgErrored = ref(false);

const imgSrc = computed(() => (props.project ? (previewImages[props.project.id] ?? "") : ""));
const fallbackGradient = computed(() =>
  props.project
    ? (previewGradients[props.project.id] ?? "linear-gradient(135deg, #020024, #010104)")
    : "linear-gradient(135deg, #020024, #010104)"
);

watch(
  () => props.project,
  () => {
    imgLoaded.value = false;
    imgErrored.value = false;
  }
);
</script>

<template>
  <div
    class="fixed pointer-events-none z-[9999] w-[320px] h-[200px] rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-opacity duration-200"
    :style="{
      left: `${currentX}px`,
      top: `${currentY}px`,
      opacity: project ? 1 : 0,
    }"
  >
    <!-- Real image -->
    <NuxtImg
      v-if="imgSrc && !imgErrored"
      :src="imgSrc"
      :alt="project?.title"
      draggable="false"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
      :class="imgLoaded ? 'opacity-100' : 'opacity-0'"
      @load="imgLoaded = true"
      @error="imgErrored = true"
    />

    <!-- Gradient fallback -->
    <div
      class="absolute inset-0"
      :style="{ background: fallbackGradient }"
      :class="imgLoaded && !imgErrored ? 'opacity-0' : 'opacity-100'"
    />
  </div>
</template>
