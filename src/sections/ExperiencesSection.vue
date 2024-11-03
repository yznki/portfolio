<script setup lang="ts">
  import ActionButton from "@/components/ActionButton.vue"
  import JobDescription from "@/components/JobDescription.vue"
  import JobExperience from "@/components/JobExperience.vue"
  import SectionHeading from "@/components/SectionHeading.vue"
  import VerticalSeparator from "@/components/VerticalSeparator.vue"

  function openCV() {
    window.open("/CV-YazanAlKiswani.pdf", "_blank")
  }
</script>

<template>
  <div id="Experience" class="bg-white px-16 md:px-32 lg:px-64">
    <SectionHeading title="Experiences" />
    <div class="flex flex-col gap-4">
      <JobExperience image-src="/InfineonLogo.svg" image-alt="Infineon Logo">
        <JobDescription company-name="Infineon Technologies Austria" job-title="Software Engineer Intern" start-date="2024">
          Coding my way through microchips and software magic—basically making tech work like a charm (while sipping too much coffee)!
        </JobDescription>
      </JobExperience>
      <VerticalSeparator size="large" />
      <JobExperience image-src="/SagerLogo.svg" image-alt="Sager Logo">
        <JobDescription company-name="Sager Drone" job-title="Product Owner" start-date="2023" end-date="2024">
          Wore the captain’s hat at SAGER! Juggled features, sprints, and a lot of team chats to turn big ideas into real products—no magic
          wand needed (but it would’ve helped)!
        </JobDescription>
        <VerticalSeparator size="small" />
        <JobDescription job-title="Product Engineer" start-date="2022" end-date="2023">
          Hands deep in R&D—tweaking, testing, and perfecting our streamlined services. Pretty much playing with the coolest gadgets and
          calling it work!
        </JobDescription>
        <VerticalSeparator size="small" />
        <JobDescription job-title="Graphic Designer Intern" start-date="2021" end-date="2022">
          Doodled my way through SAGER’s branding! Crafted snazzy visuals, mixed creativity with pixels, and learned the art of making
          things look cooler than they actually are.
        </JobDescription>
      </JobExperience>
      <div class="my-6 flex justify-center">
        <ActionButton label="My Résumé" intent="tertiary" :onClick="openCV" />
      </div>
    </div>
  </div>
</template>
