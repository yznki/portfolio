<script setup lang="ts">
const visible = ref(false);

onMounted(() => {
  const el = document.getElementById("contact");
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  if (el) observer.observe(el);
});

const MAIL_HREF = `mailto:yznkiswani@gmail.com?subject=${encodeURIComponent("Let's Collaborate!")}`;
</script>

<template>
  <section id="contact" class="bg-background py-24 px-6 lg:px-10">
    <div class="mx-auto max-w-6xl">
      <div
        class="border-t border-b border-white/[0.06] py-16 transition-[opacity,transform] duration-700 ease-out"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <div class="max-w-lg">
          <h2 class="text-3xl md:text-4xl font-black text-text-color mb-4 leading-tight">
            Let's build something.
          </h2>
          <p class="text-white/40 text-base mb-10 leading-relaxed">
            Have a project, a job, or just want to talk about tech? My inbox is always open.
          </p>

          <div class="flex flex-wrap items-center gap-4">
            <a
              :href="MAIL_HREF"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white text-sm font-semibold transition-all duration-300 hover:bg-primary-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/25"
            >
              Send Me an Email
              <FontAwesomeIcon icon="fa-arrow-right" class="text-xs" />
            </a>
            <a
              href="https://www.linkedin.com/in/yznki"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/12 text-white/60 text-sm font-semibold transition-all duration-300 hover:border-white/25 hover:text-white hover:-translate-y-0.5"
            >
              <FontAwesomeIcon :icon="['fab', 'linkedin']" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
