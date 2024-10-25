<script setup lang="ts">
import NameDescription from "@/components/NameDescription.vue"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
</script>

<template>
  <main class="h-full w-full bg-custom-gradient px-16 pt-12 md:px-24 lg:px-48">
    <div class="flex h-full w-full flex-col justify-between">
      <div>
        <img src="/YLogo.svg" alt="Y Logo" class="w-6 text-white" />
      </div>
      <div class="flex w-full items-center justify-between">
        <NameDescription />
        <img src="/Memoji.png" alt="Memoji Image" />
      </div>
      <div class="flex w-full gap-16">
        <p class="w-1/5 text-justify text-text-color">
          I’m all about crafting <span class="font-bold italic">sleek interfaces</span> and powerful backends that keep things running
          smoothly—think of me as the <span class="font-bold italic">tech wizard</span> making sure everything just works.
        </p>
        <p class="w-1/5 text-justify text-primary-200">
          From <span class="font-bold italic">frontend finesse</span> to backend brilliance, I turn ideas into
          <span class="font-bold italic">digital realities</span> that not only look good but feel right.
          <span class="font-bold italic">Let’s create something awesome together!</span>
        </p>
      </div>
      <div class="mb-8 mt-auto flex w-full flex-col items-center justify-center gap-2 hover:cursor-pointer">
        <p class="font-bold text-text-color">Scroll Down</p>
        <FontAwesomeIcon :icon="faChevronDown" class="text-text-color" />
      </div>
    </div>
  </main>
</template>
