<script setup lang="ts">
  export interface JobExperienceProps {
    /**
     * The source for the image.
     */
    imageSrc: string

    /**
     * The alt text for the image.
     */
    imageAlt: string
  }

  const { imageSrc, imageAlt } = defineProps<JobExperienceProps>()
</script>

<template>
  <div class="flex w-full flex-col items-start gap-4 md:flex-row">
    <div class="flex min-h-12 min-w-40 max-w-40 items-center justify-center md:min-h-24">
      <img :src="imageSrc" :alt="imageAlt" class="object-contain" />
    </div>
    <div class="flex flex-col gap-2">
      <slot />
    </div>
  </div>
</template>
