<script setup lang="ts">
import { cva } from "class-variance-authority";

export interface VerticalSeparatorProps {
  /**
   * The size of the separator.
   */
  size: "small" | "medium" | "large";
}

const { size } = defineProps<VerticalSeparatorProps>();

const separatorStyling = cva("inline-block min-h-[1em] w-0.5 self-stretch bg-[#CACACA]", {
  variants: {
    size: {
      small: "h-2 md:ml-2",
      medium: "h-4 mx-auto md:ml-24",
      large: "h-8 mx-auto md:ml-40",
    },
  },
});
</script>

<template>
  <div :class="separatorStyling({ size })" />
</template>
