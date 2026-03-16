<script setup lang="ts">
export interface JobExperienceProps {
  imageSrc: string;
  imageAlt: string;
}

const { imageSrc, imageAlt } = defineProps<JobExperienceProps>();

// Derive slug from image path (e.g. "/MindTechLogo.svg" → "mindtech")
const logoSlug = computed(() => {
  const match = imageSrc.match(/\/(\w+)Logo\./i);
  return match ? match[1].toLowerCase() : "";
});
</script>

<template>
  <div class="flex w-full flex-col items-start gap-4 md:flex-row md:items-start">
    <div class="flex h-10 w-36 items-center justify-start md:h-14 md:justify-center flex-shrink-0">
      <NuxtImg
        :src="imageSrc"
        :alt="imageAlt"
        class="h-full object-contain logo-img transition-opacity duration-200"
        :class="`logo-${logoSlug}`"
      />
    </div>
    <div class="flex w-full flex-col gap-2">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Default: invert dark logos to show on dark background */
.logo-img {
  filter: invert(1);
  opacity: 0.55;
}

/* MindTech — simple dark logo, invert to white */
.logo-mindtech {
  filter: invert(1);
  opacity: 0.6;
}

/* Sager — simple dark logo, invert to white */
.logo-sager {
  filter: invert(1);
  opacity: 0.55;
}

/* Infineon — colored logo (red/black), desaturate + max brightness */
.logo-infineon {
  filter: invert(1) saturate(0) brightness(1.2);
  opacity: 0.5;
}
</style>
