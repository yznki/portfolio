<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Case overview'"
  >
    <div :class="containerClasses">
      <div class="flex flex-col gap-4">
        <p :class="kickerClasses">Overview</p>
        <h2 :class="titleClasses">{{ title || 'Design language shaped for longevity.' }}</h2>
        <p :class="descriptionClasses">
          {{ summary || 'A modular brand system connecting digital and physical experiences through rigorous typography, disciplined color, and cohesive UI foundations.' }}
        </p>
      </div>
      <div :class="detailsWrapper">
        <div
          v-for="detail in detailsToRender"
          :key="detail.label"
          :class="detailCardClasses"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{{ detail.label }}</p>
          <p :class="valueClasses">{{ detail.value }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type Detail = { label: string; value: string }

const props = defineProps({
  title: { type: String, default: '' },
  summary: { type: String, default: '' },
  details: { type: Array as () => Detail[], default: () => [] },
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
    { threshold: 0.15 }
  )
  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => observer?.disconnect())

const detailsToRender = computed<Detail[]>(() =>
  props.details?.length
    ? props.details
    : [
        { label: 'Deliverables', value: 'Identity toolkit, UI kit, Motion system' },
        { label: 'Timeline', value: '12 weeks from discovery to launch' },
        { label: 'Team', value: 'Lead designer, strategist, motion partner' }
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
      return 'mx-auto flex max-w-5xl flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start lg:gap-16 lg:px-12'
    case 'bold':
      return 'mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:px-12'
    default:
      return 'mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[1fr_0.9fr] lg:px-10'
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
      return 'text-3xl font-semibold tracking-tight sm:text-4xl'
    case 'bold':
      return 'text-3xl font-bold tracking-tight sm:text-[2.6rem] text-white'
    default:
      return 'text-3xl font-semibold tracking-tight sm:text-4xl'
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

const detailsWrapper = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'grid grid-cols-1 gap-4 sm:grid-cols-2'
    case 'bold':
      return 'grid grid-cols-1 gap-4 sm:grid-cols-2'
    default:
      return 'grid grid-cols-1 gap-3 sm:grid-cols-2'
  }
})

const detailCardClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'rounded-2xl border border-slate-100 bg-white/70 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md'
    case 'bold':
      return 'rounded-xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-emerald-300/40'
    default:
      return 'rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition hover:-translate-y-0.5'
  }
})

const valueClasses = computed(() =>
  props.variant === 'bold' ? 'mt-2 text-base font-semibold text-white' : 'mt-2 text-base font-semibold text-slate-900'
)
</script>
