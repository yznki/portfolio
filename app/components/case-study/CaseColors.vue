<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Color system'"
  >
    <div :class="containerClasses">
      <div class="space-y-3">
        <p :class="kickerClasses">Color system</p>
        <h3 :class="titleClasses">{{ title || 'Intentional palette for clarity and energy' }}</h3>
        <p :class="descriptionClasses">
          {{ description || 'A balanced spectrum of neutrals and accents with token-friendly naming that keeps interfaces cohesive and accessible.' }}
        </p>
      </div>
      <div :class="swatchGridClasses">
        <div
          v-for="color in colorsToRender"
          :key="color.name"
          :class="swatchClasses"
        >
          <div class="h-24 w-full rounded-xl" :style="{ backgroundColor: color.hex }"></div>
          <div class="mt-4 flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-slate-900" :class="textOnDark">{{ color.name }}</p>
              <p class="text-xs text-slate-500" :class="textMuted">{{ color.hex }}</p>
            </div>
            <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="pillClasses">WCAG AA</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type Swatch = { name: string; hex: string }

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  colors: { type: Array as () => Swatch[], default: () => [] },
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

onBeforeUnmount(() => observer?.disconnect())

const colorsToRender = computed<Swatch[]>(() =>
  props.colors?.length
    ? props.colors
    : [
        { name: 'Midnight', hex: '#0F172A' },
        { name: 'Mist', hex: '#E2E8F0' },
        { name: 'Fern', hex: '#34D399' },
        { name: 'Aurora', hex: '#C084FC' },
        { name: 'Glow', hex: '#FBBF24' }
      ]
)

const baseClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'bg-white text-slate-900'
    case 'bold':
      return 'bg-slate-950 text-white'
    default:
      return 'bg-slate-50 text-slate-900'
  }
})

const containerClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'mx-auto max-w-6xl px-6 py-14 lg:px-12'
    case 'bold':
      return 'mx-auto max-w-6xl px-6 py-16 lg:px-12'
    default:
      return 'mx-auto max-w-5xl px-6 py-12 lg:px-10'
  }
})

const kickerClasses = computed(() =>
  props.variant === 'bold'
    ? 'text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300'
    : 'text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'
)

const titleClasses = computed(() =>
  props.variant === 'bold'
    ? 'text-3xl font-bold tracking-tight text-white'
    : 'text-3xl font-semibold tracking-tight text-slate-900'
)

const descriptionClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'mt-2 max-w-3xl text-lg leading-relaxed text-slate-600'
    case 'bold':
      return 'mt-2 max-w-3xl text-lg leading-relaxed text-slate-200'
    default:
      return 'mt-2 max-w-3xl text-lg leading-relaxed text-slate-700'
  }
})

const swatchGridClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
    case 'bold':
      return 'mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'
    default:
      return 'mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
  }
})

const swatchClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'rounded-2xl border border-slate-100 bg-white/70 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md'
    case 'bold':
      return 'rounded-xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-emerald-300/50'
    default:
      return 'rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition hover:-translate-y-0.5'
  }
})

const pillClasses = computed(() =>
  props.variant === 'bold'
    ? 'bg-emerald-300/15 text-emerald-200 border border-emerald-300/40'
    : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
)

const textOnDark = computed(() => (props.variant === 'bold' ? 'text-white' : ''))
const textMuted = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-500'))
</script>
