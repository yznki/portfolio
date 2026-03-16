<script setup lang="ts">
defineProps<{
  modelValue: string;
  counts: Record<string, number>;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const filters = [
  { key: "all", label: "All" },
  { key: "mobile", label: "Mobile" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "uiux", label: "UI/UX" },
];
</script>

<template>
  <div class="flex items-center gap-3 flex-wrap text-[12px] font-medium uppercase tracking-[0.08em]">
    <template v-for="(f, i) in filters" :key="f.key">
      <button
        class="transition-colors duration-200 cursor-pointer"
        :class="
          modelValue === f.key
            ? 'text-white font-semibold'
            : 'text-white/35 hover:text-white/70'
        "
        @click="emit('update:modelValue', f.key)"
      >
        {{ f.label }} ({{ counts[f.key] ?? 0 }})
      </button>
      <span v-if="i < filters.length - 1" class="text-white/15">/</span>
    </template>
  </div>
</template>
