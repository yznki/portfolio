<script setup lang="ts">
  import SectionHeading from "@/components/SectionHeading.vue"
  import ProjectCard from "@/components/ProjectCard.vue"
</script>

<template>
  <div id="Experience" class="mb-4 pb-8">
    <SectionHeading bg-color="black" title="Projects" class="px-12 md:px-24 lg:px-48" />
    <div class="grid grid-cols-1 md:grid-cols-3">
      <ProjectCard logo-src="projects/sehaty/logo.svg" project-image="projects/sehaty/project.png" project-url="/sehaty" />
      <ProjectCard logo-src="projects/sehaty/logo.svg" project-image="projects/sehaty/project.png" project-url="/sehaty" />
      <ProjectCard logo-src="projects/sehaty/logo.svg" project-image="projects/sehaty/project.png" project-url="/sehaty" />
      <ProjectCard logo-src="projects/sehaty/logo.svg" project-image="projects/sehaty/project.png" project-url="/sehaty" />
      <ProjectCard logo-src="projects/sehaty/logo.svg" project-image="projects/sehaty/project.png" project-url="/sehaty" />
      <ProjectCard logo-src="projects/sehaty/logo.svg" project-image="projects/sehaty/project.png" project-url="/sehaty" />
    </div>
  </div>
</template>
