<script setup lang="ts">
defineProps<{
  id?: string;
}>();

const el = ref<HTMLElement | null>(null);
const visible = ref(false);

onMounted(() => {
  // Respect prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
    { threshold: 0.04, rootMargin: "0px 0px -60px 0px" }
  );
  if (el.value) observer.observe(el.value);
});
</script>

<template>
  <section
    ref="el"
    :id="id"
    class="transition-[opacity,transform] duration-700 ease-out"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <slot />
  </section>
</template>
