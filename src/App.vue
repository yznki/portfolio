<script setup lang="ts">
import ExperiencesView from "./views/ExperiencesView.vue"
import HomeView from "./views/HomeView.vue"

import { ref, onMounted } from "vue"

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => (isLoaded.value = true), 300)
})
</script>

<template>
  <div class="h-screen w-screen scroll-smooth bg-background">
    <div class="h-full opacity-0 transition-all duration-[1000ms] ease-linear" :class="{ 'opacity-100': isLoaded }">
      <HomeView />
      <ExperiencesView />
    </div>
  </div>
</template>
