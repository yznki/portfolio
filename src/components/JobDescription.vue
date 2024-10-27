<script setup lang="ts">
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
</script>

<template>
  <div class="flex flex-col items-start justify-center">
    <p v-if="companyName" class="text-3xl font-bold">{{ companyName }}</p>
    <p class="text-lg">
      <span class="text-primary-500">{{ jobTitle }}</span> | {{ startDate }} - {{ endDate ?? "Present" }}
    </p>
    <p class="text-justify text-[#707070]"><slot /></p>
  </div>
</template>
