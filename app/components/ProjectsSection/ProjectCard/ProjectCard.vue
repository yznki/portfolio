<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

interface ProjectCardProps {
  projectUrl: string;
  logoSrc?: string;
  projectImage?: string;
}

const props = defineProps<ProjectCardProps>();

const router = useRouter();

function goToProjectPage() {
  router.push(`/projects/${props.projectUrl}`);
}

const hover = ref(false);
const isSmallDevice = ref(false);

function checkDevice() {
  isSmallDevice.value = window.matchMedia("(max-width: 768px)").matches;
}

onMounted(() => {
  checkDevice();
  window.addEventListener("resize", checkDevice);
});
onUnmounted(() => {
  window.removeEventListener("resize", checkDevice);
});

const showProjectImage = computed(() => isSmallDevice.value || hover.value);
const showLogo = computed(() => !isSmallDevice.value && !hover.value);
</script>

<template>
  <div
    class="relative h-72 w-full transition-all duration-700 ease-in-out max-md:cursor-pointer max-md:overflow-hidden max-md:rounded-2xl max-md:shadow-md"
    @click="goToProjectPage"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Logo view -->
    <div
      class="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out"
      :class="{ 'opacity-0': !showLogo, 'opacity-100': showLogo }"
    >
      <div
        class="h-28 w-28 bg-contain bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${props.logoSrc})` }"
      ></div>
    </div>

    <!-- Project image view -->
    <div
      class="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
      :class="{
        'cursor-pointer opacity-100': showProjectImage,
        'opacity-0': !showProjectImage,
      }"
      :style="{ backgroundImage: `url(${props.projectImage})` }"
    ></div>

    <!-- Subtle gradient overlay on mobile -->
    <div
      v-if="isSmallDevice"
      class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"
    ></div>
  </div>
</template>
