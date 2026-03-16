<script setup lang="ts">
import { projects, type Project } from "~/data/projects";

definePageMeta({ layout: "projects", title: "Projects" });
useHead({ title: "Selected Work — Yazan Al-Kiswani" });

// ── Filter state ──────────────────────────────────────────────────────────────
const activeFilter = ref<string>("all");

const filteredProjects = computed(() => {
  if (activeFilter.value === "all") return projects;
  return projects.filter((p) => p.type === activeFilter.value);
});

const filterCounts = computed(() => ({
  all: projects.length,
  mobile: projects.filter((p) => p.type === "mobile").length,
  fullstack: projects.filter((p) => p.type === "fullstack").length,
  uiux: projects.filter((p) => p.type === "uiux").length,
}));

// ── Row entrance (once on mount, not on filter change) ────────────────────────
const rowsVisible = ref(false);

onMounted(() => {
  setTimeout(() => (rowsVisible.value = true), 80);
});

// ── Cursor preview state ──────────────────────────────────────────────────────
const activeProject = ref<Project | null>(null);

function onRowEnter(project: Project) {
  activeProject.value = project;
}

function onRowLeave() {
  activeProject.value = null;
}
</script>

<template>
  <div class="pb-24 md:pb-0">
    <!-- Cursor preview (desktop only) -->
    <ProjectsCursorPreview :project="activeProject" class="hidden md:block" />

    <div class="mx-auto max-w-6xl px-6 lg:px-10 pt-10 md:pt-14">
      <!-- Page header -->
      <div class="flex items-baseline justify-between mb-8">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-light text-text-color tracking-tight">
          Selected Work
        </h1>
        <span class="text-[13px] font-mono text-white/25 hidden md:block">
          {{ String(projects.length).padStart(2, "0") }} projects
        </span>
      </div>

      <!-- Filter row -->
      <div class="mb-12">
        <ProjectsFilterRow v-model="activeFilter" :counts="filterCounts" />
      </div>

      <!-- Project rows -->
      <div>
        <ProjectsRow
          v-for="(project, i) in filteredProjects"
          :key="project.id"
          :project="project"
          :index="i"
          :visible="rowsVisible"
          @mouse-enter="onRowEnter"
          @mouse-leave="onRowLeave"
        />

        <!-- Empty state -->
        <div
          v-if="filteredProjects.length === 0"
          class="border-t border-white/[0.07] py-16 text-center text-white/25 text-sm"
        >
          No projects match this filter.
        </div>

        <!-- Bottom border -->
        <div class="border-t border-white/[0.07]" />
      </div>

      <!-- Footer CTA row -->
      <div class="border-t border-white/[0.07]">
        <div class="py-6 flex items-center justify-between gap-4">
          <p class="text-base md:text-lg text-white/50 font-medium">Have a project in mind?</p>
          <a
            href="mailto:yznkiswani@gmail.com"
            class="text-sm md:text-base font-semibold text-white/50 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
          >
            Get in touch
            <span
              class="transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5 inline-block"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
