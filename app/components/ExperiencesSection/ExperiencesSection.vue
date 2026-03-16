<script setup lang="ts">
function openCV() {
  window.open("/CV-YazanAlKiswani.pdf", "_blank");
}

const visible = ref(false);

onMounted(() => {
  const el = document.getElementById("experience");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    visible.value = true;
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  if (el) observer.observe(el);
});
</script>

<template>
  <section
    id="experience"
    class="bg-background py-20 px-6 lg:px-10 transition-[opacity,transform] duration-700 ease-out"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
  >
    <div class="mx-auto max-w-6xl">
      <div class="flex items-end gap-6 mb-12">
        <h2
          class="text-2xl md:text-3xl font-black text-text-color leading-none whitespace-nowrap"
        >
          Experience
        </h2>
        <div class="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent mb-1" />
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-4 top-2 bottom-2 w-px bg-white/[0.07] hidden md:block" />

        <div class="flex flex-col gap-10">
          <!-- MindTech -->
          <div class="relative md:pl-12">
            <div
              class="absolute left-[13px] top-1.5 h-2.5 w-2.5 rounded-full border border-primary-400/60 bg-background hidden md:block"
            />
            <JobExperience image-src="/MindTechLogo.svg" image-alt="MindTech Logo">
              <JobDescription
                company-name="MindTech"
                :is-current="true"
                job-title="Software Engineer"
                start-date="2024"
                location="Vienna, Austria"
              >
                Developing full-stack and cross-platform software solutions for cutting-edge
                projects. Building AI-powered mobile and web apps, architecting APIs, and crafting
                seamless user experiences — basically turning wild ideas into production-grade tools!
              </JobDescription>
            </JobExperience>
          </div>

          <!-- Infineon -->
          <div class="relative md:pl-12">
            <div
              class="absolute left-[13px] top-1.5 h-2.5 w-2.5 rounded-full border border-primary-400/60 bg-background hidden md:block"
            />
            <JobExperience image-src="/InfineonLogo.svg" image-alt="Infineon Logo">
              <JobDescription
                company-name="Infineon Technologies Austria"
                :is-current="true"
                job-title="Software Engineer Consultant"
                start-date="2024"
                location="Villach, Austria"
              >
                Partnering with Infineon teams to build internal tools that make validation and
                automation smoother, smarter, and faster. Turning engineering pain points into
                polished, efficient systems.
              </JobDescription>

              <VerticalSeparator size="small" />

              <JobDescription
                job-title="Software Engineer Intern"
                start-date="2024"
                end-date="2024"
                location="Villach, Austria"
              >
                Dived into the world of semiconductors! Helped design and test automation software —
                and apparently impressed enough to get a full-time offer in just
                <span class="font-bold italic">three months.</span>
              </JobDescription>
            </JobExperience>
          </div>

          <!-- Sager Drone -->
          <div class="relative md:pl-12">
            <div
              class="absolute left-[13px] top-1.5 h-2.5 w-2.5 rounded-full border border-white/20 bg-background hidden md:block"
            />
            <JobExperience image-src="/SagerLogo.svg" image-alt="Sager Logo">
              <JobDescription
                company-name="Sager Drone"
                job-title="Product Owner"
                start-date="2022"
                end-date="2024"
                location="Amman, Jordan"
              >
                Steered the ship at SAGER — managing features, testing autonomous flight systems,
                and leading cross-functional teams to make drones smarter, faster, and way cooler.
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
                Designed everything from logos to launch visuals — adding a creative touch to
                high-tech innovation. My early love letter to visual design.
              </JobDescription>
            </JobExperience>
          </div>
        </div>
      </div>

      <div class="mt-10 flex justify-start md:pl-12">
        <ActionButton label="My Résumé" intent="tertiary" :onClick="openCV" />
      </div>
    </div>
  </section>
</template>
