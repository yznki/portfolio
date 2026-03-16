<script setup lang="ts">
export interface ShowcaseImage {
  src: string;
  alt?: string;
  label?: string;
  caption?: string;
}

const props = defineProps<{
  images: ShowcaseImage[];
  type?: "scroll-strip" | "grid" | "showcase";
  aspect?: "screen" | "wide" | "square" | "auto";
}>();

const stripEl = ref<HTMLElement | null>(null);
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

function onMouseDown(e: MouseEvent) {
  if (!stripEl.value) return;
  isDragging = true;
  startX = e.pageX - stripEl.value.offsetLeft;
  scrollLeft = stripEl.value.scrollLeft;
  stripEl.value.style.cursor = "grabbing";
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging || !stripEl.value) return;
  e.preventDefault();
  const x = e.pageX - stripEl.value.offsetLeft;
  const walk = (x - startX) * 1.2;
  stripEl.value.scrollLeft = scrollLeft - walk;
}

function onMouseUp() {
  isDragging = false;
  if (stripEl.value) stripEl.value.style.cursor = "grab";
}

const displayType = computed(() => props.type ?? "grid");
const displayAspect = computed(() => props.aspect ?? "auto");

// Grid columns: 2 on mobile for screens, 3 for wide/landscape
const gridCols = computed(() => {
  if (displayAspect.value === "screen") return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  return "grid-cols-1 md:grid-cols-2";
});
</script>

<template>
  <!-- SCROLL STRIP -->
  <div v-if="displayType === 'scroll-strip'" class="relative -mx-6 md:mx-0">
    <div
      ref="stripEl"
      class="flex gap-4 overflow-x-auto pb-4 px-6 md:px-0 snap-x snap-mandatory cursor-grab select-none"
      style="scrollbar-width: none; -ms-overflow-style: none"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
    >
      <div
        v-for="(img, i) in images"
        :key="i"
        class="snap-start flex-shrink-0 flex flex-col gap-2"
        :class="displayAspect === 'screen' ? 'w-[200px] md:w-[240px]' : 'w-[320px] md:w-[400px]'"
      >
        <CaseStudyImageSlot
          :src="img.src"
          :alt="img.alt"
          :label="img.label"
          :aspect="displayAspect === 'auto' ? undefined : displayAspect"
          class="hover:scale-[1.02] transition-transform duration-300"
        />
        <p v-if="img.caption" class="text-[11px] text-white/40 text-center leading-snug px-1">
          {{ img.caption }}
        </p>
      </div>
    </div>
    <!-- Fade edges -->
    <div
      class="pointer-events-none absolute top-0 left-0 bottom-4 w-8 bg-gradient-to-r from-background to-transparent md:hidden"
    />
    <div
      class="pointer-events-none absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent"
    />
  </div>

  <!-- GRID -->
  <div v-else-if="displayType === 'grid'" class="grid gap-4" :class="gridCols">
    <div v-for="(img, i) in images" :key="i" class="flex flex-col gap-2">
      <CaseStudyImageSlot
        :src="img.src"
        :alt="img.alt"
        :label="img.label"
        :aspect="displayAspect === 'auto' ? undefined : displayAspect"
        class="hover:scale-[1.01] transition-transform duration-300"
      />
      <p v-if="img.caption" class="text-[11px] text-white/40 text-center">{{ img.caption }}</p>
    </div>
  </div>

  <!-- SHOWCASE (single large featured image) -->
  <div v-else-if="displayType === 'showcase' && images.length > 0 && images[0]" class="flex flex-col gap-2">
    <CaseStudyImageSlot
      :src="images[0].src"
      :alt="images[0].alt"
      :label="images[0].label"
      :aspect="displayAspect === 'auto' ? 'wide' : displayAspect"
      class="w-full"
    />
    <p v-if="images[0].caption" class="text-xs text-white/40 text-center mt-1">
      {{ images[0].caption }}
    </p>
  </div>
</template>

<style scoped>
div::-webkit-scrollbar {
  display: none;
}
</style>
