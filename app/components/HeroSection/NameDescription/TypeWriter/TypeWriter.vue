<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const typeValue = ref("");
const typeStatus = ref(false);
const typeArray = ["Software Engineer.", "UI/UX Designer.", "Graphic Designer."];
const typingSpeed = 150;
const erasingSpeed = 100;
const newTextDelay = 1250;
const typeArrayIndex = ref(0);
const charIndex = ref(0);
const isTypingEnabled = ref(false); // Start with false to rely on observer

const typeText = () => {
  if (!isTypingEnabled.value) return; // Stop typing if not in view

  const currentText = typeArray[typeArrayIndex.value];
  if (currentText && charIndex.value < currentText.length) {
    if (!typeStatus.value) typeStatus.value = true;

    typeValue.value += currentText.charAt(charIndex.value);
    charIndex.value += 1;

    setTimeout(typeText, typingSpeed);
  } else {
    typeStatus.value = false;
    setTimeout(eraseText, newTextDelay);
  }
};

const eraseText = () => {
  if (!isTypingEnabled.value) return; // Stop erasing if not in view
  const currentText = typeArray[typeArrayIndex.value];
  if (charIndex.value > 0) {
    if (!typeStatus.value) typeStatus.value = true;

    typeValue.value = currentText ? currentText.substring(0, charIndex.value - 1) : "";
    charIndex.value -= 1;

    setTimeout(eraseText, erasingSpeed);
  } else {
    typeStatus.value = false;
    typeArrayIndex.value += 1;
    if (typeArrayIndex.value >= typeArray.length) typeArrayIndex.value = 0;

    setTimeout(typeText, typingSpeed + 1000);
  }
};

const startTyping = () => {
  if (!isTypingEnabled.value) {
    isTypingEnabled.value = true;
    typeText(); // Start typing when in view
  }
};

const stopTyping = () => {
  isTypingEnabled.value = false;
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  // Set up the Intersection Observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startTyping();
        } else {
          stopTyping();
        }
      });
    },
    { threshold: 0.1 } // Adjust threshold as needed
  );

  // Observe the element
  const element = document.querySelector("#typewriter");
  if (element) observer.observe(element);

  // Trigger typing immediately on mount in case the element is already in view
  startTyping();
});

onUnmounted(() => {
  // Clean up the observer
  if (observer) observer.disconnect();
});
</script>

<template>
  <span id="typewriter" class="font-bold text-primary-500">{{ typeValue }}</span>
  <span class="ml-1 inline-block w-0.5 bg-primary-500" :class="{ 'animate-blink': !typeStatus }"
    >&nbsp;</span
  >
</template>

<style scoped>
@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s infinite;
}
</style>
