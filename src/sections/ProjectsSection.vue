<script setup lang="ts">
  import SectionHeading from "@/components/SectionHeading.vue"
  import ProjectCard from "@/components/ProjectCard.vue"
</script>

<template>
  <div id="Experience" class="px-16 md:px-32 lg:px-64">
    <SectionHeading bg-color="black" title="Projects" />
    <div class="grid grid-cols-1 md:grid-cols-3">
      <ProjectCard logo-src="/SehatyLogo.svg" project-image="/SehatyProject.png" project-url="/sehaty" />
      <div class="bg-gray-200 p-4">Column 2</div>
      <div class="bg-gray-200 p-4">Column 3</div>
    </div>
  </div>
</template>
