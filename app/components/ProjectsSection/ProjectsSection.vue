<script setup lang="ts">
import { projects } from "~/data/projects";

const featured = projects.slice(0, 2);
</script>

<template>
  <section id="projects" class="bg-background py-20 px-6 lg:px-10">
    <div class="mx-auto max-w-6xl">
      <div class="flex items-end gap-6 mb-10">
        <h2
          class="text-2xl md:text-3xl font-black text-text-color leading-none whitespace-nowrap"
        >
          Featured Work
        </h2>
        <div class="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent mb-1" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <ProjectCard
          v-for="(project, index) in featured"
          :key="project.id"
          :project="project"
          :anim-delay="index * 100"
        />
      </div>

      <div class="mt-8 flex justify-center md:justify-start">
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 text-sm font-semibold text-white/45 hover:text-white transition-colors duration-200 group"
        >
          View All {{ projects.length }} Projects
          <span
            class="transition-transform duration-200 group-hover:translate-x-1 inline-block"
          >
            →
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
