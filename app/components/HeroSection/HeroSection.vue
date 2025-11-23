<script setup lang="ts">
function scrollToElement() {
  const element = document.getElementById("Experience");

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
</script>

<template>
  <main class="h-screen w-screen bg-custom-gradient px-12 pt-8 md:px-24 lg:px-48">
    <div class="flex h-full w-full flex-col justify-between">
      <NuxtImg src="/YLogo.svg" alt="Yazan's Logo" class="w-6 text-white" />
      <div class="flex w-full flex-col items-center justify-between md:flex-row">
        <NuxtImg src="/Memoji.png" class="object-contain" alt="Yazan's Memoji" />
        <NameDescription class="md:order-first" />
      </div>
      <DescriptiveParagraphs />
      <div
        class="mb-8 mt-16 flex w-full flex-col items-center justify-center hover:cursor-pointer"
        @click="scrollToElement"
      >
        <p class="font-bold text-text-color">Scroll Down</p>
        <FontAwesomeIcon icon="fa-chevron-down" class="text-text-color" />
      </div>
    </div>
  </main>
</template>
