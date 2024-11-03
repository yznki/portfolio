<script setup lang="ts">
  import DescriptiveParagraphs from "@/components/DescriptiveParagraphs.vue"
  import NameDescription from "@/components/NameDescription.vue"
  import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

  function scrollToElement() {
    const element = document.getElementById("Experience")

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }
</script>

<template>
  <main class="h-screen w-screen bg-custom-gradient px-16 pt-12 md:px-32 lg:px-64">
    <div class="flex h-full w-full flex-col justify-between">
      <img src="/YLogo.svg" alt="Yazan's Logo" class="w-6 text-white" />
      <div class="flex w-full flex-col items-center justify-between md:flex-row">
        <img src="/Memoji.png" class="object-contain" alt="Yazan's Memoji" />
        <NameDescription class="md:order-first" />
      </div>
      <DescriptiveParagraphs />
      <div class="mb-8 mt-auto flex w-full flex-col items-center justify-center hover:cursor-pointer" @click="scrollToElement">
        <p class="font-bold text-text-color">Scroll Down</p>
        <FontAwesomeIcon :icon="faChevronDown" class="text-text-color" />
      </div>
    </div>
  </main>
</template>
