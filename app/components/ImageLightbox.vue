<script setup lang="ts">
const { state, closeLightbox, prev, next } = useLightbox();

const current = computed(() => state.images[state.index]);

function onKeydown(e: KeyboardEvent) {
  if (!state.open) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));

// Prevent body scroll when open
watch(
  () => state.open,
  (open) => {
    document.body.style.overflow = open ? "hidden" : "";
  }
);
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="state.open"
        class="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-sm flex items-center justify-center"
        @click.self="closeLightbox"
      >
        <!-- Close -->
        <button
          class="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200 cursor-pointer"
          @click="closeLightbox"
        >
          <FontAwesomeIcon icon="fa-xmark" class="text-sm" />
        </button>

        <!-- Counter -->
        <span
          v-if="state.images.length > 1"
          class="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 text-xs font-mono tracking-wider"
        >
          {{ state.index + 1 }} / {{ state.images.length }}
        </span>

        <!-- Image -->
        <Transition
          enter-active-class="transition-opacity duration-150"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          mode="out-in"
        >
          <img
            :key="current?.src"
            :src="current?.src"
            :alt="current?.alt ?? current?.caption ?? ''"
            class="max-w-[90vw] max-h-[82vh] object-contain rounded-lg shadow-2xl select-none"
            draggable="false"
          />
        </Transition>

        <!-- Caption -->
        <p
          v-if="current?.caption"
          class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/45 text-xs text-center px-6 max-w-sm leading-relaxed"
        >
          {{ current.caption }}
        </p>

        <!-- Prev -->
        <button
          v-if="state.images.length > 1"
          class="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200 cursor-pointer"
          @click="prev"
        >
          <FontAwesomeIcon icon="fa-chevron-left" class="text-sm" />
        </button>

        <!-- Next -->
        <button
          v-if="state.images.length > 1"
          class="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200 cursor-pointer"
          @click="next"
        >
          <FontAwesomeIcon icon="fa-chevron-right" class="text-sm" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
