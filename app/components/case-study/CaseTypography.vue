<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Typography system'"
  >
    <div :class="containerClasses">
      <div class="space-y-3">
        <p :class="kickerClasses">Typography</p>
        <h3 :class="titleClasses">{{ title || 'Precision typography for digital and print' }}</h3>
        <p :class="descriptionClasses">
          {{ description || 'A disciplined typographic stack that adapts across touchpoints with optical sizing and expressive display options.' }}
        </p>
        <div :class="badgeRowClasses">
          <span class="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm" v-if="fontName">
            {{ fontName }}
          </span>
          <span class="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700" v-if="secondaryFont">
            {{ secondaryFont }}
          </span>
        </div>
      </div>
      <div :class="samplesWrapperClasses">
        <div
          v-for="sample in samplesToRender"
          :key="sample.label"
          :class="sampleCardClasses"
        >
          <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.1em] text-slate-500" :class="textOnDark">
            <span>{{ sample.label }}</span>
            <span>{{ sample.size }}</span>
          </div>
          <p :class="sampleTextClasses">{{ sample.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type Sample = { label: string; text: string; size: string }

const props = defineProps({
  title: { type: String, default: '' },
  fontName: { type: String, default: '' },
  secondaryFont: { type: String, default: '' },
  description: { type: String, default: '' },
  samples: { type: Array as () => Sample[], default: () => [] },
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

const samplesToRender = computed<Sample[]>(() =>
  props.samples?.length
    ? props.samples
    : [
        { label: 'Display', text: 'Design like you mean it.', size: '48px/1.1' },
        { label: 'Heading', text: 'Building legibility across touchpoints.', size: '32px/1.2' },
        { label: 'Body', text: 'Crafted for clarity in product flows and long-form storytelling.', size: '18px/1.6' }
      ]
)

const baseClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'bg-white text-slate-900'
    case 'bold':
      return 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white'
    default:
      return 'bg-slate-50 text-slate-900'
  }
})

const containerClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-14 lg:grid-cols-[1.1fr_1fr] lg:px-12'
    case 'bold':
      return 'mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:px-12'
    default:
      return 'mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-[1fr_1fr] lg:px-10'
  }
})

const kickerClasses = computed(() =>
  props.variant === 'bold'
    ? 'text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300'
    : 'text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'
)

const titleClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'text-2xl font-semibold tracking-tight sm:text-3xl'
    case 'bold':
      return 'text-3xl font-bold tracking-tight text-white'
    default:
      return 'text-2xl font-semibold tracking-tight sm:text-3xl'
  }
})

const descriptionClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'max-w-2xl text-lg leading-relaxed text-slate-600'
    case 'bold':
      return 'max-w-2xl text-lg leading-relaxed text-slate-200'
    default:
      return 'max-w-2xl text-lg leading-relaxed text-slate-700'
  }
})

const badgeRowClasses = computed(() =>
  props.variant === 'bold'
    ? 'flex flex-wrap items-center gap-3'
    : 'flex flex-wrap items-center gap-3'
)

const samplesWrapperClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'grid grid-cols-1 gap-4'
    case 'bold':
      return 'grid grid-cols-1 gap-4'
    default:
      return 'grid grid-cols-1 gap-4'
  }
})

const sampleCardClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'rounded-2xl border border-slate-100/80 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md'
    case 'bold':
      return 'rounded-xl border border-white/10 bg-white/5 p-5 shadow-inner transition hover:-translate-y-0.5 hover:border-emerald-300/40'
    default:
      return 'rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5'
  }
})

const sampleTextClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl'
    case 'bold':
      return 'mt-2 text-2xl font-bold text-white sm:text-3xl'
    default:
      return 'mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl'
  }
})

const textOnDark = computed(() => (props.variant === 'bold' ? 'text-white' : ''))
</script>
