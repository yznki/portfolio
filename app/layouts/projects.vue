<script setup lang="ts">
useHead({ title: "Projects" });
</script>

<template>
  <div class="relative min-h-screen bg-background text-text-color pb-24 md:pb-0">
    <div
      class="pointer-events-none absolute inset-x-0 top-[-30%] h-[40vh] bg-primary-700/30 blur-[120px]"
    />
    <div class="relative z-10 flex min-h-screen flex-col">
      <ProjectsNavigation />

      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>
