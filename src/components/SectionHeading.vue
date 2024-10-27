<script setup lang="ts">
  const { title } = defineProps<{ title: string }>()
</script>

<template>
  <div class="mb-4 flex pt-6">
    <p class="text-lg font-bold uppercase">{{ title }}</p>
  </div>
</template>
