<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt?: string;
  label?: string;
  aspect?: "hero" | "screen" | "wide" | "square" | "auto";
  class?: string;
}>();

const loaded = ref(false);
const errored = ref(false);

// Placeholder gradients keyed by partial path
const placeholderGradient = computed(() => {
  if (props.src.includes("optionqaaf"))
    return "linear-gradient(135deg, #1a0533 0%, #0a0518 50%, #020014 100%)";
  if (props.src.includes("avara"))
    return "linear-gradient(135deg, #001a2c 0%, #000d1a 50%, #010104 100%)";
  if (props.src.includes("zaraa"))
    return "linear-gradient(135deg, #0a1a08 0%, #051205 50%, #010904 100%)";
  if (props.src.includes("sehaty"))
    return "linear-gradient(135deg, #001a2c 0%, #000f1a 50%, #010209 100%)";
  if (props.src.includes("le3beti"))
    return "linear-gradient(135deg, #1a0c00 0%, #0f0600 50%, #050201 100%)";
  return "linear-gradient(135deg, #020024 0%, #010104 100%)";
});

const aspectClass = computed(() => {
  switch (props.aspect) {
    case "screen":
      return "aspect-[9/19]";
    case "wide":
      return "aspect-video";
    case "square":
      return "aspect-square";
    case "hero":
      return "min-h-[70vh]";
    default:
      return "min-h-[240px]";
  }
});

const slotName = computed(() => {
  if (props.label) return props.label;
  const parts = props.src.split("/");
  return parts[parts.length - 1] ?? props.src;
});
</script>

<template>
  <div class="relative overflow-hidden rounded-xl" :class="[aspectClass, props.class]">
    <!-- Always render the img so it can trigger load/error -->
    <img
      :src="src"
      :alt="alt ?? label ?? src"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      :class="loaded && !errored ? 'opacity-100' : 'opacity-0'"
      @load="loaded = true"
      @error="errored = true"
    />

    <!-- Placeholder — visible until image loads successfully -->
    <div
      v-if="!loaded || errored"
      class="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-white/[0.06]"
      :style="{ background: placeholderGradient }"
    >
      <FontAwesomeIcon icon="fa-image" class="text-white/10 text-3xl" />
      <span class="text-white/20 text-xs font-mono text-center px-6 leading-relaxed">
        {{ slotName }}
      </span>
    </div>
  </div>
</template>
