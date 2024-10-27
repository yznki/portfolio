<script setup lang="ts">
  import ExperiencesSection from "./views/ExperiencesSection.vue"
  import HeroSection from "./views/HeroSection.vue"

  import { ref, onMounted } from "vue"

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
    </div>
  </div>
</template>
