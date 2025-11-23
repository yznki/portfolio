<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Case results'"
  >
    <div :class="containerClasses">
      <div class="flex flex-col gap-3">
        <p :class="kickerClasses">Impact</p>
        <h3 :class="titleClasses">{{ title || 'Proof that systems perform' }}</h3>
        <p :class="descriptionClasses">
          {{ description || 'Signals that show the system is doing real work—aligning teams, elevating craft, and moving metrics.' }}
        </p>
      </div>
      <div :class="statsGridClasses">
        <div
          v-for="stat in statsToRender"
          :key="stat.label"
          :class="statCardClasses"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500" :class="textMuted">{{ stat.label }}</p>
          <p :class="valueClasses">{{ stat.value }}</p>
          <p class="text-sm text-slate-500" :class="textMuted">{{ stat.detail }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type Stat = { label: string; value: string; detail?: string }

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  stats: { type: Array as () => Stat[], default: () => [] },
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

const statsToRender = computed<Stat[]>(() =>
  props.stats?.length
    ? props.stats
    : [
        { label: 'Brand recall', value: '+35%', detail: 'Measured across priority markets' },
        { label: 'Design velocity', value: '2.3x', detail: 'Shipping cadence after system launch' },
        { label: 'Consistency', value: '94%', detail: 'Reduction in UI inconsistencies' },
        { label: 'Engagement', value: '+18%', detail: 'Lift in key product journeys' }
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
      return 'max-w-3xl text-lg leading-relaxed text-slate-600'
    case 'bold':
      return 'max-w-3xl text-lg leading-relaxed text-slate-200'
    default:
      return 'max-w-3xl text-lg leading-relaxed text-slate-700'
  }
})

const statsGridClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
    case 'bold':
      return 'mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
    default:
      return 'mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
  }
})

const statCardClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'rounded-2xl border border-slate-100 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md'
    case 'bold':
      return 'rounded-xl border border-white/10 bg-white/5 p-5 shadow-inner transition hover:-translate-y-1 hover:border-emerald-300/40'
    default:
      return 'rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-1'
  }
})

const valueClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'text-3xl font-semibold text-slate-900'
    case 'bold':
      return 'text-3xl font-bold text-white'
    default:
      return 'text-3xl font-semibold text-slate-900'
  }
})

const textMuted = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-600'))
</script>
