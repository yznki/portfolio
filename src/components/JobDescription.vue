<script setup lang="ts">
  import { computed } from "vue"

  export interface JobExperienceProps {
    /**
     * The company name of the job experience.
     *
     */
    companyName?: string

    /**
     * The title fo the job experience.
     */
    jobTitle: string

    /**
     * The start date of the job experience in year e.g. 2024.
     */
    startDate: string

    /**
     * The end date of the job experience in year e.g. 2025.
     */
    endDate?: string
  }

  const { companyName, endDate, startDate, jobTitle } = defineProps<JobExperienceProps>()

  const endDateString = computed(() => (endDate == startDate ? "" : endDate ? ` - ${endDate}` : " - Present"))
</script>

<template>
  <div class="flex flex-col items-start justify-center">
    <p v-if="companyName" class="text-xl font-bold md:text-3xl">{{ companyName }}</p>
    <p class="md:text-lg">
      <span class="text-primary-500">{{ jobTitle }}</span> | {{ startDate }}{{ endDateString }}
    </p>
    <p class="text-justify text-[#707070]"><slot /></p>
  </div>
</template>
