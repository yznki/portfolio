<script setup lang="ts">
const nameVisible = ref(false);
const roleVisible = ref(false);
const taglineVisible = ref(false);
const ctaVisible = ref(false);
const socialVisible = ref(false);

const MAIL_HREF = `mailto:yznkiswani@gmail.com?subject=${encodeURIComponent("Let's Collaborate!")}`;

onMounted(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    nameVisible.value =
      roleVisible.value =
      taglineVisible.value =
      ctaVisible.value =
      socialVisible.value =
        true;
    return;
  }
  setTimeout(() => (nameVisible.value = true), 300);
  setTimeout(() => (roleVisible.value = true), 500);
  setTimeout(() => (taglineVisible.value = true), 700);
  setTimeout(() => (ctaVisible.value = true), 900);
  setTimeout(() => (socialVisible.value = true), 1100);
});
</script>

<template>
  <main class="relative min-h-screen bg-custom-gradient flex flex-col pt-16">
    <!-- Main content -->
    <div class="flex-1 flex items-center">
      <div class="w-full mx-auto max-w-6xl px-6 lg:px-10 py-16 md:py-24">
        <div class="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-8">
          <!-- Text content -->
          <div class="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <!-- Role label -->
            <div
              class="transition-[opacity,transform] duration-700 ease-out mb-5"
              :class="roleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            >
              <span class="text-[11px] font-medium tracking-[0.18em] uppercase text-white/30">
                Software Engineer &amp; Product Designer
              </span>
            </div>

            <!-- Name -->
            <div
              class="transition-[opacity,transform] duration-700 ease-out mb-6"
              :class="nameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            >
              <h1
                class="text-5xl md:text-6xl lg:text-7xl font-black text-text-color leading-[1.05] tracking-tight"
              >
                Yazan<br />
                <span class="text-primary-300">Al-Kiswani</span>
              </h1>
            </div>

            <!-- Tagline + subtext -->
            <div
              class="transition-[opacity,transform] duration-700 ease-out mb-8"
              :class="taglineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            >
              <p class="text-lg md:text-xl font-semibold text-text-color mb-3 leading-snug">
                Building products people actually want to use.
              </p>
              <p class="text-sm md:text-base text-white/40 max-w-md leading-relaxed">
                Full-stack engineer and product designer with a thing for clean interfaces and solid
                backends. Based in Villach, Austria — building for the web and mobile.
              </p>
            </div>

            <!-- CTA buttons + availability note -->
            <div
              class="transition-[opacity,transform] duration-700 ease-out mb-8 flex flex-col items-center md:items-start gap-4"
              :class="ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            >
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <NuxtLink
                  to="/projects"
                  class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white text-sm font-semibold transition-all duration-300 hover:bg-primary-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/25"
                >
                  View My Work
                  <FontAwesomeIcon icon="fa-arrow-right" class="text-xs" />
                </NuxtLink>
                <a
                  :href="MAIL_HREF"
                  class="inline-flex items-center gap-2 px-6 py-3 text-white/50 text-sm font-semibold transition-colors duration-200 hover:text-white"
                >
                  Get in Touch
                </a>
              </div>

              <!-- Availability note — plain text, no badge -->
              <p class="text-[11px] tracking-[0.12em] uppercase text-white/25">
                Available for freelance &amp; consulting
              </p>
            </div>

            <!-- Social links -->
            <div
              class="transition-[opacity,transform] duration-700 ease-out flex items-center gap-6 flex-wrap justify-center md:justify-start"
              :class="socialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            >
              <a
                href="https://github.com/yznki"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-200 text-sm font-medium"
              >
                <FontAwesomeIcon :icon="['fab', 'github']" class="text-base" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yznki"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-200 text-sm font-medium"
              >
                <FontAwesomeIcon :icon="['fab', 'linkedin']" class="text-base" />
                LinkedIn
              </a>
              <a
                href="https://www.figma.com/@yznki"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-200 text-sm font-medium"
              >
                <FontAwesomeIcon :icon="['fab', 'figma']" class="text-base" />
                Figma
              </a>
            </div>
          </div>

          <!-- Memoji -->
          <div class="flex-shrink-0 flex justify-center">
            <div class="relative">
              <NuxtImg
                src="/Memoji.png"
                alt="Yazan's Memoji"
                class="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain memoji-float"
              />
              <div
                class="absolute inset-0 bg-primary-500/8 rounded-full blur-3xl -z-10 scale-[0.7]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats strip -->
    <div class="border-t border-white/[0.06]">
      <div
        class="mx-auto max-w-6xl px-6 lg:px-10 py-4 flex flex-wrap items-center gap-3 md:gap-5"
      >
        <span class="text-xs text-white/20 font-medium">5 Projects</span>
        <span class="text-white/10 text-xs">·</span>
        <span class="text-xs text-white/20 font-medium">3 Years Experience</span>
        <span class="text-white/10 text-xs">·</span>
        <span class="text-xs text-white/20 font-medium">Villach, Austria</span>
        <span class="text-white/10 text-xs">·</span>
        <span class="text-xs text-white/20 font-medium">React Native · Vue · React</span>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.memoji-float {
  animation: float 4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .memoji-float {
    animation: none;
  }
}
</style>
