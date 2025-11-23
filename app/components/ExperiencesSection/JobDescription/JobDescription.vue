<script setup lang="ts">
import { computed } from "vue";

export interface JobExperienceProps {
  companyName?: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  location?: string;
}

const { companyName, jobTitle, startDate, endDate, location } = defineProps<JobExperienceProps>();

const endDateString = computed(() =>
  endDate == startDate ? "" : endDate ? ` - ${endDate}` : " - Present"
);
</script>

<template>
  <div class="flex flex-col items-start justify-center">
    <p v-if="companyName" class="text-xl font-bold md:text-2xl">{{ companyName }}</p>
    <p class="md:text-lg">
      <span class="text-primary-500">{{ jobTitle }}</span> | {{ startDate }}{{ endDateString }}
    </p>
    <p v-if="location" class="mb-1 text-sm italic text-[#909090]">{{ location }}</p>
    <p class="text-justify leading-relaxed text-[#707070]"><slot /></p>
  </div>
</template>
