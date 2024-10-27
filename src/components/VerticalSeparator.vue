<script setup lang="ts">
  import { cva } from "class-variance-authority"

  export interface VerticalSeparatorProps {
    /**
     * The size of the separator.
     */
    size: "small" | "medium" | "large"
  }

  const { size } = defineProps<VerticalSeparatorProps>()

  const separatorStyling = cva("inline-block min-h-[1em] w-0.5 self-stretch bg-[#CACACA]", {
    variants: {
      size: {
        small: "h-[8px] ml-2",
        medium: "h-[16px] ml-10",
        large: "h-[32px] ml-20",
      },
    },
  })
</script>

<template>
  <div :class="separatorStyling({ size })" />
</template>
