<script setup lang="ts">
/**
 * Opens the default email client with a pre-filled email.
 */
function sendEmail() {
  const email = "yznkiswani@gmail.com";
  const subject = "Let's Collaborate on Something Awesome!";
  const body =
    "Hey there!\n\nI hope this message finds you well. I'm excited about the possibility of working together on a new project. Let's create something amazing!\n\nCheers,\n[Your Name]";
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
</script>

<template>
  <div class="flex flex-col items-center md:items-start">
    <h1 class="text-5xl font-bold leading-snug text-text-color">
      Yazan <span class="whitespace-nowrap">Al-Kiswani</span>
    </h1>
    <span class="mb-12 pl-1 text-3xl text-text-color md:mb-2">I am a <TypeWriter /></span>
    <span class="mb-4 hidden pl-1 text-text-color md:block"
      >Turning code into cool, functional experiences (with a bit of magic and
      <span class="font-bold italic">redbull</span>, of course).</span
    >
    <ActionButton :icon="['fas', 'paper-plane']" label="Lets Work Together!" :onClick="sendEmail" />
  </div>
</template>
