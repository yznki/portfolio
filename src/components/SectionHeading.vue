<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>

<template>
  <div class="flex pt-6">
    <p class="text-lg font-bold uppercase">{{ title }}</p>
  </div>
</template>
