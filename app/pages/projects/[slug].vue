<script setup lang="ts">
import { projects } from "~/data/projects";

definePageMeta({ layout: "projects" });

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const project = computed(() => projects.find((p) => p.id === slug.value));

useHead(computed(() => ({ title: project.value?.title ?? "Project" })));

watchEffect(() => {
  if (import.meta.client && slug.value && !project.value) {
    navigateTo("/projects");
  }
});
</script>

<template>
  <CaseStudyPage v-if="project" :project-id="slug" />
</template>
