<script setup lang="ts">
const scrolled = ref(false);
const route = useRoute();

function onScroll() {
  scrolled.value = window.scrollY > 40;
}

function handleAnchorClick(e: MouseEvent, href: string) {
  if (!href.startsWith("/#")) return;
  const id = href.slice(2);
  if (route.path === "/") {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="
      scrolled
        ? 'bg-background/90 backdrop-blur-xl border-b border-white/[0.06]'
        : 'bg-transparent'
    "
  >
    <div class="mx-auto max-w-6xl px-6 lg:px-10 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" aria-label="Home">
        <NuxtImg src="/YLogo.svg" alt="YK" class="h-6 w-6" />
      </NuxtLink>

      <!-- Desktop nav links -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        <a
          href="/#experience"
          class="text-white/45 hover:text-white transition-colors duration-200"
          @click="handleAnchorClick($event, '/#experience')"
        >
          Experience
        </a>
        <a
          href="/#skills"
          class="text-white/45 hover:text-white transition-colors duration-200"
          @click="handleAnchorClick($event, '/#skills')"
        >
          Skills
        </a>
        <NuxtLink
          to="/projects"
          class="text-white/45 hover:text-white transition-colors duration-200"
        >
          Projects
        </NuxtLink>
        <a
          href="/#contact"
          class="text-white/45 hover:text-white transition-colors duration-200"
          @click="handleAnchorClick($event, '/#contact')"
        >
          Contact
        </a>
      </nav>

      <!-- Mobile: Projects link only -->
      <NuxtLink
        to="/projects"
        class="md:hidden text-sm font-semibold text-white/50 hover:text-white transition-colors duration-200"
      >
        Projects
      </NuxtLink>
    </div>
  </header>
</template>
