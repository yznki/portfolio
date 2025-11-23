<script setup lang="ts">
export interface JobExperienceProps {
  imageSrc: string;
  imageAlt: string;
}

const { imageSrc, imageAlt } = defineProps<JobExperienceProps>();
</script>

<template>
  <div class="flex w-full flex-col items-start gap-4 md:flex-row md:items-start">
    <div class="flex h-12 w-40 items-center justify-start md:h-16 md:justify-center">
      <NuxtImg
        :src="imageSrc"
        :alt="imageAlt"
        class="h-full object-contain opacity-90 transition-all duration-200 hover:opacity-100"
      />
    </div>
    <div class="flex w-full flex-col gap-2">
      <slot />
    </div>
  </div>
</template>
