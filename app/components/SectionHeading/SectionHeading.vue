<script setup lang="ts">
export interface SectionHeadingProps {
  /**
   * The name of the section.
   */
  title: string;

  /**
   * The color of the section's background.
   */
  bgColor?: "white" | "black";
}

const { title, bgColor } = defineProps<SectionHeadingProps>();
</script>

<template>
  <div class="mb-4 flex pt-6">
    <p class="text-lg font-bold uppercase" :class="{ 'text-white': bgColor === 'black' }">
      {{ title }}
    </p>
  </div>
</template>
