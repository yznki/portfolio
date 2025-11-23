<script setup lang="ts">
definePageMeta({
  title: "Home",
});

const isLoaded = ref(false);

onMounted(() => {
  setTimeout(() => (isLoaded.value = true), 300);
});
</script>

<template>
  <div class="h-screen w-screen scroll-smooth bg-background">
    <div
      class="h-full opacity-0 transition-all duration-1000 ease-linear"
      :class="{ 'opacity-100': isLoaded }"
    >
      <HeroSection />
      <ExperiencesSection />
      <ProjectsSection />
      <FooterSection />
    </div>
  </div>
</template>
