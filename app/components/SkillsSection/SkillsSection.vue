<script setup lang="ts">
const skills = [
  "React Native",
  "Vue / Nuxt",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Shopify",
  "Figma",
  "UI/UX Design",
  "Expo / EAS",
  "GraphQL",
  "Git",
  "REST APIs",
  "Tailwind CSS",
  "Auth0",
];

const pillsVisible = ref<boolean[]>([]);

onMounted(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    pillsVisible.value = Array(skills.length).fill(true);
    return;
  }

  const el = document.getElementById("skills");
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        pillsVisible.value = Array(skills.length).fill(false);
        skills.forEach((_, i) => {
          setTimeout(() => {
            pillsVisible.value[i] = true;
          }, i * 40);
        });
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  if (el) observer.observe(el);
});
</script>

<template>
  <section id="skills" class="bg-background py-20 px-6 lg:px-10">
    <div class="mx-auto max-w-6xl">
      <div class="flex items-end gap-6 mb-10">
        <h2 class="text-2xl md:text-3xl font-black text-text-color leading-none whitespace-nowrap">
          What I Work With
        </h2>
        <div class="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent mb-1" />
      </div>

      <div class="flex flex-wrap gap-2.5">
        <span
          v-for="(skill, i) in skills"
          :key="skill"
          class="px-4 py-2 rounded-full border border-white/[0.07] text-sm font-medium text-white/45 transition-[opacity,transform] duration-500 ease-out"
          :style="{
            opacity: pillsVisible[i] ? 1 : 0,
            transform: pillsVisible[i] ? 'translateY(0)' : 'translateY(10px)',
            transitionDelay: `${i * 40}ms`,
          }"
        >
          {{ skill }}
        </span>
      </div>
    </div>
  </section>
</template>
