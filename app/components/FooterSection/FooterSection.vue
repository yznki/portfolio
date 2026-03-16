<script setup lang="ts">
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <footer class="bg-background px-6 lg:px-10 pb-8 pt-4">
    <div class="mx-auto max-w-6xl">
      <div class="flex items-center justify-between gap-4 py-6 border-t border-white/[0.06]">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" aria-label="Home">
            <NuxtImg src="/YLogo.svg" class="w-5 opacity-50 hover:opacity-100 transition-opacity duration-200" alt="YK" />
          </NuxtLink>
          <p class="text-xs text-white/20">
            &copy; {{ new Date().getFullYear() }} Yazan Al-Kiswani
          </p>
        </div>

        <div class="flex items-center gap-4">
          <button
            class="text-xs text-white/25 hover:text-white/60 transition-colors duration-200 flex items-center gap-1 cursor-pointer"
            @click="scrollToTop"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
