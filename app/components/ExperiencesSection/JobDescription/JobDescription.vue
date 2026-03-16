<script setup lang="ts">
import { computed } from "vue";

export interface JobExperienceProps {
  companyName?: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  location?: string;
  isCurrent?: boolean;
}

const { companyName, jobTitle, startDate, endDate, location, isCurrent } =
  defineProps<JobExperienceProps>();

const endDateString = computed(() =>
  endDate == startDate ? "" : endDate ? ` – ${endDate}` : " – Present"
);
</script>

<template>
  <div class="flex flex-col items-start justify-center">
    <p v-if="companyName" class="text-base md:text-lg font-bold text-text-color mb-0.5">
      {{ companyName }}
    </p>
    <p class="text-sm mb-1">
      <span :class="isCurrent ? 'text-primary-300' : 'text-white/35'">{{ jobTitle }}</span>
      <span class="text-white/25"> · {{ startDate }}{{ endDateString }}</span>
    </p>
    <p v-if="location" class="mb-2 text-xs text-white/20 italic">{{ location }}</p>
    <p class="leading-relaxed text-white/45 text-sm">
      <slot />
    </p>
  </div>
</template>
