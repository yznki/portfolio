<script setup lang="ts">
import type { ProjectType } from "~/data/projects";

const props = defineProps<{
  modelValue: string;
  counts: Record<string, number>;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const filters: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mobile", label: "Mobile" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "uiux", label: "UI/UX" },
];
</script>

<template>
  <div
    class="flex items-center gap-2 overflow-x-auto"
    style="scrollbar-width: none; -ms-overflow-style: none"
  >
    <button
      v-for="f in filters"
      :key="f.key"
      class="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer"
      :class="
        modelValue === f.key
          ? 'bg-primary-500/25 text-primary-300 border border-primary-500/40'
          : 'border border-white/[0.08] text-white/40 bg-white/[0.03] hover:text-white/70 hover:border-white/20'
      "
      @click="emit('update:modelValue', f.key)"
    >
      {{ f.label }}
      <span class="opacity-50 text-[10px]">({{ counts[f.key] ?? 0 }})</span>
    </button>
  </div>
</template>
