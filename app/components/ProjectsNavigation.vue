<script setup lang="ts">
import { useChangeCase } from "@vueuse/integrations/useChangeCase";

const router = useRouter();
const route = useRoute();

const routeTitle = computed(() => route.meta.title as string);

const goBack = () => {
  if ("/projects" !== route.fullPath) {
    router.push("/projects");
  } else {
    router.push("/");
  }
};

const rawTitle = computed(() => routeTitle.value ?? "Projects");
const titleCaseTitle = useChangeCase(rawTitle, "pascalCase");
const upperTitle = useChangeCase(rawTitle, "capitalCase");
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-linear-to-r from-secondary-500/60 via-background/95 to-background/90 backdrop-blur-xl md:sticky md:top-0 md:border-b md:border-t-0 md:bottom-auto md:left-auto md:right-auto"
  >
    <div
      class="relative mx-auto flex w-full max-w-6xl flex-row-reverse items-center justify-between px-6 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)] md:flex-row md:py-4 lg:px-10"
    >
      <div class="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          class="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-color transition duration-200 hover:-translate-y-0.5 hover:border-primary-400/70 hover:bg-white/10 hover:cursor-pointer"
          @click="goBack"
        >
          <FontAwesomeIcon
            icon="fa-arrow-left"
            class="text-primary-200 transition group-hover:-translate-x-0.5"
          />
        </button>

        <div
          class="hidden items-center gap-3 text-sm font-semibold text-white md:flex md:text-base"
          aria-hidden="true"
        >
          <span class="text-white/40">|</span>
          <span class="font-semibold">{{ titleCaseTitle }}</span>
        </div>
      </div>

      <span
        class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-[0.16em] text-white md:hidden"
      >
        {{ upperTitle }}
      </span>

      <NuxtLink
        to="/"
        class="group flex items-center gap-3 text-sm font-semibold tracking-widest uppercase"
      >
        <span
          class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition duration-200 group-hover:ring-primary-400/70"
        >
          <NuxtImg src="/YLogo.svg" alt="Yazan Al Kiswani logo" class="h-6 w-6" />
        </span>
      </NuxtLink>
    </div>
    <div class="h-px bg-linear-to-r from-transparent via-primary-400/70 to-transparent" />
  </nav>
</template>
