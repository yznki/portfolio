<script setup lang="ts">
  import { ref } from "vue"

  interface ProjectCardProps {
    /**
     * The URL of the project's page.
     */
    projectUrl: string

    /**
     * The URL of the project's logo.
     */
    logoSrc?: string

    /**
     * The URL of the project's image.
     */
    projectImage?: string
  }

  const props = defineProps<ProjectCardProps>()

  /**
   * Redirects the user to the project's page
   */
  function goToProjectPage() {
    window.open(props.projectUrl, "_blank")
  }

  const hover = ref(false)
</script>

<template>
  <div
    class="relative h-72 w-full transition-all duration-700 ease-in-out"
    @click="goToProjectPage"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div
      class="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out"
      :class="{ 'opacity-0': hover, 'opacity-100': !hover }"
    >
      <div class="h-32 w-32 bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url(${props.logoSrc})` }"></div>
    </div>
    <div
      class="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
      :class="{ 'cursor-pointer opacity-100': hover, 'opacity-0': !hover }"
      :style="{ backgroundImage: `url(${props.projectImage})` }"
    ></div>
  </div>
</template>
