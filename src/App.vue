<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import HeroSection from "./sections/HeroSection.vue"
  import ExperiencesSection from "./sections/ExperiencesSection.vue"
  import ProjectsSection from "./sections/ProjectsSection.vue"
  import FooterSection from "./sections/FooterSection.vue"

  const isLoaded = ref(false)

  onMounted(() => {
    setTimeout(() => (isLoaded.value = true), 300)
  })
</script>

<template>
  <div class="h-screen w-screen scroll-smooth bg-background">
    <div class="h-full opacity-0 transition-all duration-[1000ms] ease-linear" :class="{ 'opacity-100': isLoaded }">
      <HeroSection />
      <ExperiencesSection />
      <ProjectsSection />
      <FooterSection />
    </div>
  </div>
</template>
