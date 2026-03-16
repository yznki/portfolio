<script setup lang="ts">
defineProps<{
  label: string;
  url: string;
  description?: string;
}>();
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="group inline-flex items-center gap-4 px-5 py-4 rounded-xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300 hover:border-accent-500/40 hover:bg-accent-500/[0.06]"
  >
    <div
      class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-accent-500/30 bg-accent-500/10 transition-colors duration-300 group-hover:bg-accent-500/20"
    >
      <FontAwesomeIcon :icon="['fab', 'figma']" class="text-accent-400 text-lg" />
    </div>
    <div class="min-w-0">
      <div class="text-sm font-semibold text-text-color group-hover:text-white transition-colors duration-200">
        {{ label }}
      </div>
      <div class="text-xs text-white/35 mt-0.5">
        {{ description ?? "Open in Figma" }} ↗
      </div>
    </div>
  </a>
</template>
