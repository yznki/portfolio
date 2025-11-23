<script setup lang="ts">
function sendEmail() {
  const email = "yznkiswani@gmail.com";
  const subject = "Let's Collaborate on Something Awesome!";
  const body =
    "Hey there!\n\nI hope this message finds you well. I'm excited about the possibility of working together on a new project. Let's create something amazing!\n\nCheers,\n[Your Name]";
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function goToSocialMedia(socialMedia: string) {
  let url = "";
  switch (socialMedia) {
    case "linkedin":
      url = "https://www.linkedin.com/in/yznki";
      break;
    case "github":
      url = "https://github.com/yznki";
      break;
    case "instagram":
      url = "https://www.instagram.com/yznki";
      break;
    case "twitter":
      url = "https://twitter.com/yznki";
      break;
    case "behance":
      url = "https://www.behance.net/yznki";
      break;
  }
  window.open(url, "_blank");
}
</script>

<template>
  <footer class="flex flex-col gap-4 px-12 pb-8 md:px-24 lg:px-48">
    <div class="flex w-full items-end justify-between">
      <NuxtImg src="/YLogo.svg" class="w-6" alt="" />
      <div class="flex gap-2">
        <FontAwesomeIcon
          :icon="['fab', 'linkedin']"
          class="text-white hover:cursor-pointer"
          @click="goToSocialMedia('linkedin')"
        />
        <FontAwesomeIcon
          :icon="['fab', 'github']"
          class="text-white hover:cursor-pointer"
          @click="goToSocialMedia('github')"
        />
        <FontAwesomeIcon
          :icon="['fab', 'instagram']"
          class="text-white hover:cursor-pointer"
          @click="goToSocialMedia('instagram')"
        />
        <FontAwesomeIcon
          :icon="['fab', 'x-twitter']"
          class="text-white hover:cursor-pointer"
          @click="goToSocialMedia('twitter')"
        />
        <FontAwesomeIcon
          :icon="['fab', 'behance']"
          class="text-white hover:cursor-pointer"
          @click="goToSocialMedia('behance')"
        />
      </div>
    </div>
    <hr class="border-[#707070]" />
    <div class="flex w-full items-center justify-between">
      <p class="text-sm text-[#707070]">
        &copy; {{ new Date().getFullYear() }} Yazan Al-Kiswani. All rights reserved.
      </p>
      <a
        :href="sendEmail()"
        class="text-sm text-[#707070] transition-colors duration-300 hover:cursor-pointer hover:text-[#7d7d7d]"
      >
        yznkiswani@gmail.com
      </a>
    </div>
  </footer>
</template>
