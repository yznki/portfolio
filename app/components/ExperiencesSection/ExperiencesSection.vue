<script setup lang="ts">
function openCV() {
  window.open("/CV-YazanAlKiswani.pdf", "_blank");
}
</script>

<template>
  <div id="Experience" class="bg-white px-12 md:px-24 lg:px-48">
    <SectionHeading title="Experiences" />
    <div class="flex flex-col gap-4">
      <!-- MindTech -->
      <JobExperience image-src="/MindTechLogo.svg" image-alt="MindTech Logo">
        <JobDescription
          company-name="MindTech"
          job-title="Software Engineer"
          start-date="2024"
          location="Vienna, Austria"
        >
          Developing full-stack and cross-platform software solutions for cutting-edge projects.
          Building AI-powered mobile and web apps, architecting APIs, and crafting seamless user
          experiences — basically turning wild ideas into production-grade tools!
        </JobDescription>
      </JobExperience>

      <VerticalSeparator size="large" />

      <!-- Infineon -->
      <JobExperience image-src="/InfineonLogo.svg" image-alt="Infineon Logo">
        <JobDescription
          company-name="Infineon Technologies Austria"
          job-title="Software Engineer Consultant"
          start-date="2024"
          location="Villach, Austria"
        >
          Partnering with Infineon teams to build internal tools that make validation and automation
          smoother, smarter, and faster. Turning engineering pain points into polished, efficient
          systems.
        </JobDescription>

        <VerticalSeparator size="small" />

        <JobDescription
          job-title="Software Engineer Intern"
          start-date="2024"
          end-date="2024"
          location="Villach, Austria"
        >
          Dived into the world of semiconductors! Helped design and test automation software — and
          apparently impressed enough to get a full-time offer in just
          <span class="font-bold italic">three months.</span>
        </JobDescription>
      </JobExperience>

      <VerticalSeparator size="large" />

      <!-- Sager Drone -->
      <JobExperience image-src="/SagerLogo.svg" image-alt="Sager Logo">
        <JobDescription
          company-name="Sager Drone"
          job-title="Product Owner"
          start-date="2022"
          end-date="2024"
          location="Amman, Jordan"
        >
          Steered the ship at SAGER — managing features, testing autonomous flight systems, and
          leading cross-functional teams to make drones smarter, faster, and way cooler.
        </JobDescription>

        <VerticalSeparator size="small" />

        <JobDescription
          job-title="Product Engineer"
          start-date="2022"
          end-date="2023"
          location="Amman, Jordan"
        >
          Focused on crafting intuitive control interfaces and optimizing system performance —
          because great drones deserve great UX.
        </JobDescription>

        <VerticalSeparator size="small" />

        <JobDescription
          job-title="Graphic Designer Intern"
          start-date="2021"
          end-date="2022"
          location="Amman, Jordan"
        >
          Designed everything from logos to launch visuals — adding a creative touch to high-tech
          innovation. My early love letter to visual design.
        </JobDescription>
      </JobExperience>

      <div class="my-6 flex justify-center">
        <ActionButton label="My Résumé" intent="tertiary" :onClick="openCV" />
      </div>
    </div>
  </div>
</template>
