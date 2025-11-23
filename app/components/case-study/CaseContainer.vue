<template>
  <div :class="['mx-auto max-w-6xl px-6 lg:px-12 py-16 lg:py-20', classOverride]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  classOverride: { type: String, default: '' }
})
</script>
