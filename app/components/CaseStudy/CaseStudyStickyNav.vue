<script setup lang="ts">
defineProps<{
  sections: { id: string; label: string }[];
}>();

const visible = ref(false);
const activeId = ref("");

let sectionEls: HTMLElement[] = [];

// Find the deepest section whose top has crossed 40% down the viewport.
// This means a section stays active for its entire height — no gaps.
function updateActive() {
  if (!sectionEls.length) return;
  const threshold = window.scrollY + window.innerHeight * 0.4;
  let current = sectionEls[0]!.id;
  for (const el of sectionEls) {
    if (el.offsetTop <= threshold) current = el.id;
  }
  activeId.value = current;
}

onMounted(() => {
  // Show nav after hero scrolls out of view
  const hero = document.getElementById("cs-hero");
  if (hero) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) visible.value = !entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    heroObserver.observe(hero);
  }

  // Track active section via scroll — always has a winner
  sectionEls = Array.from(document.querySelectorAll<HTMLElement>("[data-cs-section]"));
  if (sectionEls.length) {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateActive);
});

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-400 ease-out"
    enter-from-class="opacity-0 translate-y-3"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-3"
  >
    <div
      v-if="visible"
      class="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 md:bottom-6 pointer-events-none"
    >
      <nav
        class="flex items-center gap-0.5 rounded-full border border-white/10 bg-secondary-500/80 backdrop-blur-xl px-2 py-1.5 shadow-xl shadow-black/40 pointer-events-auto"
      >
        <button
          v-for="section in sections"
          :key="section.id"
          class="px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wide transition-all duration-200 cursor-pointer"
          :class="
            activeId === section.id
              ? 'bg-primary-500/30 text-primary-300'
              : 'text-white/40 hover:text-white/80 hover:bg-white/[0.06]'
          "
          @click="scrollTo(section.id)"
        >
          {{ section.label }}
        </button>
      </nav>
    </div>
  </Transition>
</template>
