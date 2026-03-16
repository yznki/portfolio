<script setup lang="ts">
const progress = ref(0);

function update() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
}

onMounted(() => window.addEventListener("scroll", update, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", update));
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-white/[0.05]">
    <div
      class="h-full bg-gradient-to-r from-primary-500 to-accent-500"
      :style="{ width: `${progress}%`, transition: 'width 80ms linear' }"
    />
  </div>
</template>
