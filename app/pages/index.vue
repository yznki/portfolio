<script setup lang="ts">
useHead({ title: "Home" });
</script>

<template>
  <div class="h-screen w-screen scroll-smooth bg-background">
    <div class="h-full">
      <HeroSection />
      <ExperiencesSection />
      <ProjectsSection />
      <FooterSection />
    </div>
  </div>
</template>
