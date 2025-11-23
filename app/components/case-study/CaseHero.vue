<template>
  <section
    ref="sectionRef"
    :class="[
      baseSection,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Case study hero'"
  >
    <div :class="wrapperClasses">
      <div class="flex flex-col gap-6 lg:gap-8">
        <div class="flex items-center gap-3 text-sm font-medium tracking-tight uppercase text-slate-500">
          <span class="inline-flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
            {{ label || 'Brand Identity' }}
          </span>
          <span class="text-slate-400">•</span>
          <span>{{ year || '2024' }}</span>
        </div>
        <div class="flex flex-col gap-4">
          <h1 :class="titleClasses">{{ title || 'Brand Revival for Solstice Studio' }}</h1>
          <p :class="taglineClasses">
            {{ tagline || 'Building a resilient, elevated brand language for a global creative collective.' }}
          </p>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div :class="infoCardClasses">
            <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">Role</p>
            <p class="text-base font-semibold text-slate-900" :class="textOnDark">{{ role || 'Lead Designer' }}</p>
          </div>
          <div :class="infoCardClasses">
            <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">Services</p>
            <ul class="mt-2 space-y-1 text-base font-semibold text-slate-900" :class="textOnDark">
              <li v-for="service in servicesToRender" :key="service">{{ service }}</li>
            </ul>
          </div>
          <div :class="infoCardClasses">
            <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">Impact</p>
            <p class="mt-2 text-base font-semibold text-slate-900" :class="textOnDark">
              {{ impact || '35% uplift in brand recall across key markets.' }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="image" :class="imageWrapperClasses">
        <img
          :src="image"
          :alt="imageAlt || 'Case study hero visual'"
          class="h-full w-full object-cover"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

const props = defineProps({
  label: { type: String, default: '' },
  title: { type: String, default: '' },
  tagline: { type: String, default: '' },
  role: { type: String, default: '' },
  year: { type: [String, Number], default: '' },
  services: { type: Array as () => string[], default: () => ['Identity system', 'Design language', 'Guidelines'] },
  impact: { type: String, default: '' },
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
  variant: { type: String as () => Variant, default: 'minimal' },
  ariaLabel: { type: String, default: '' },
  classOverride: { type: String, default: '' }
})

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!sectionRef.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

const servicesToRender = computed(() => props.services?.length ? props.services : ['Identity system', 'Design language', 'Guidelines'])

const baseSection = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'bg-white text-slate-900'
    case 'bold':
      return 'bg-slate-900 text-white'
    default:
      return 'bg-slate-50 text-slate-900'
  }
})

const wrapperClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 lg:px-12 lg:py-16 lg:flex-row lg:items-end'
    case 'bold':
      return 'mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-2 lg:px-12 lg:py-20'
    default:
      return 'mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-14 lg:grid-cols-3 lg:px-10'
  }
})

const titleClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem]'
    case 'bold':
      return 'text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] text-white'
    default:
      return 'text-4xl font-semibold tracking-tight sm:text-5xl'
  }
})

const taglineClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'max-w-2xl text-lg text-slate-600'
    case 'bold':
      return 'max-w-xl text-lg text-slate-200'
    default:
      return 'max-w-2xl text-lg text-slate-700'
  }
})

const infoCardClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'rounded-2xl border border-slate-100/80 bg-white/70 p-4 shadow-sm backdrop-blur'
    case 'bold':
      return 'rounded-xl border border-white/10 bg-white/5 p-4 shadow-inner'
    default:
      return 'rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm'
  }
})

const imageWrapperClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'relative h-72 w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-lg lg:h-full'
    case 'bold':
      return 'relative h-80 w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl'
    default:
      return 'relative h-72 w-full overflow-hidden rounded-[28px] border border-slate-200/60 bg-white shadow-lg lg:col-span-2'
  }
})

const textOnDark = computed(() => (props.variant === 'bold' ? 'text-white' : ''))
</script>
